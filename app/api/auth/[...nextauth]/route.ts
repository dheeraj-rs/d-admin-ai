import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/shared/lib/db';
import { UserModel as User } from '@/features/builder/services/models';

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: 'repo read:user user:email',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
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

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Callbacks for session and token management
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log(`📡 Attempting sign-in for: ${user.email} (${account?.provider})`);
        
        if (!user.email) {
          console.warn('⚠️ Sign-in attempted without email address. Skipping database sync.');
          return true;
        }

        await connectDB();
        console.log('✅ Connected to MongoDB for sign-in sync');

        const existingUser = await User.findOne({ email: user.email });
        console.log(`🔍 User lookup complete: ${existingUser ? 'Found existing user' : 'User not found'}`);

        if (existingUser) {
          // Update existing user
          existingUser.name = user.name || existingUser.name;
          existingUser.image = user.image || existingUser.image;
          await existingUser.save();
          console.log('📝 Updated existing user in MongoDB');
        } else {
          // Create new user
          await User.create({
            email: user.email,
            name: user.name || undefined,
            image: user.image || undefined,
          });
          console.log('✨ Created new user in MongoDB');
        }

        return true;
      } catch (error: any) {
        console.error('❌ CRITICAL ERROR in signIn callback:', error.message || error);
        console.error('Stack trace:', error.stack);
        // We MUST return true to allow the user to still log in even if our DB sync fails
        return true;
      }
    },

    async jwt({ token, account, user, profile, trigger, session }) {
      // Initial sign in
      if (account && user) {
        // If we already have a provider and it's different, we are likely linking
        if (token.provider && token.provider !== account.provider) {
          if (account.provider === 'github') {
            token.githubAccessToken = account.access_token;
            token.githubUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              login: (profile as any)?.login,
            };
          }
        } else {
          // Primary login
          token.accessToken = account.access_token;
          token.provider = account.provider;
          token.email = user.email;
          token.name = user.name;
          token.picture = user.image;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.accessToken = token.accessToken as string;
        session.provider = token.provider as string;

        // Add GitHub specific fields if they exist
        if (token.githubAccessToken) {
          (session as any).githubAccessToken = token.githubAccessToken;
        }
        if (token.githubUser) {
          (session as any).githubUser = token.githubUser;
        }
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login',
  },

  // Security settings
  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',

  // Events for logging (optional)
  events: {
    async signIn({ user, account, profile }) {
      console.log(`✅ User signed in: ${user.email} via ${account?.provider}`);
    },
    async signOut({ token }) {
      // With Mongoose, maybe we don't need to manually update lastLogout unless schema supports it
      console.log(`👋 User signed out: ${token.email}`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
