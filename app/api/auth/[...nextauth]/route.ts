import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/shared/lib/db";
import { UserModel } from "@/features/builder/services/models";

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: (process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID) as string,
            clientSecret: (process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET) as string,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    scope: 'repo read:user user:email',
                },
            },
        }),
        GoogleProvider({
            clientId: (process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_ID) as string,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET) as string,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a",
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await connectDB();
                if (user.email) {
                    await UserModel.findOneAndUpdate(
                        { email: user.email },
                        {
                            email: user.email,
                            name: user.name || undefined,
                            image: user.image || undefined,
                        },
                        { upsert: true, new: true }
                    );
                }
                return true;
            } catch (error) {
                console.error('Error syncing user to DB:', error);
                return true;
            }
        },
        async jwt({ token, account, user, profile }) {
            // Initial sign in
            if (account && user) {
                // Primary login
                token.accessToken = account.access_token;
                token.provider = account.provider;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;

                if (account.provider === 'github') {
                    token.githubAccessToken = account.access_token;
                    token.githubUser = {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        login: (profile as any)?.login,
                    };
                }
            }
            return token;
        },
        async session({ session, token }) {
            // Add custom fields to session
            if (session.user) {
                session.user.id = token.sub as string;
                session.accessToken = token.accessToken as string;
                session.provider = token.provider as string;

                // Add GitHub specific fields if they exist
                if (token.githubAccessToken) {
                    session.githubAccessToken = token.githubAccessToken;
                }
                if (token.githubUser) {
                    session.githubUser = token.githubUser;
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';
