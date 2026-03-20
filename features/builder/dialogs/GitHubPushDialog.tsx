'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Modal from '../components/ui/Modal';
import { Icon } from '@iconify/react';
import { GitHubService } from '../lib/github';
import { toast } from 'react-toastify';
import { useProjectsStore } from '../store/projects-store';
import { generateReactProjectFiles } from '../lib/export-utils';

interface GitHubPushDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GitHubPushDialog({
  isOpen,
  onClose,
}: GitHubPushDialogProps) {
  const { data: session } = useSession();
  const [repoName, setRepoName] = useState('project');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isWebsiteLinkAttached, setIsWebsiteLinkAttached] = useState(true);
  const { currentProjectId, getProject } = useProjectsStore();
  const project = currentProjectId ? getProject(currentProjectId) : null;
  const hasDeployment = !!project?.deploymentUrl;
  const pages = project?.pages || [];

  const isGitHubConnected =
    session?.provider === 'github' || session?.accessToken;
  const isGoogleUser = session?.provider === 'google';

  const handlePushToGitHub = async () => {
    const token = session?.githubAccessToken || session?.accessToken;

    if (!token) {
      toast.error('Not authenticated with GitHub');
      return;
    }

    if (!repoName.trim()) {
      toast.error('Repository name is required');
      return;
    }

    if (!project || pages.length === 0) {
      toast.error('No project or pages to push');
      return;
    }

    try {
      setIsPushing(true);
      const ghService = new GitHubService(token as string);
      let repo;
      const homepage = isWebsiteLinkAttached ? project?.deploymentUrl : undefined;

      try {
        repo = await ghService.createRepository(repoName, isPrivate, homepage);
        toast.info('Repository created successfully. Pushing files...');
      } catch (error: any) {
        if (error.message === 'Repository already exists') {
          toast.info('Repository exists, pushing updates...');
          let owner = session?.githubUser?.login;
          if (!owner) {
            const user = await ghService.getUser();
            owner = user.login;
          }
          repo = { owner: { login: owner }, name: repoName };
          if (homepage) {
            try {
              await ghService.updateRepository(owner, repoName, { homepage });
            } catch (updateError) {
              console.error(
                'Failed to update repository homepage:',
                updateError,
              );
            }
          }
        } else {
          throw error;
        }
      }

      const files = await generateReactProjectFiles(pages, repoName);

      await ghService.pushToRepository(
        repo.owner.login,
        repo.name,
        files as any,
        `Update from AI Website Builder: ${new Date().toLocaleString()}`,
      );

      toast.success('Successfully pushed to GitHub!');
      onClose();
    } catch (error: any) {
      console.error('GitHub Push Error:', error);
      toast.error(`Failed to push to GitHub: ${error.message}`);
    } finally {
      setIsPushing(false);
    }
  };

  const handleConnectGitHub = () => {
    const callbackUrl = window.location.href;
    signIn('github', { callbackUrl });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Push to GitHub" size="md">
      <div className="space-y-6">
        {!session ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 text-center bg-[var(--d-admin-surface-section)] rounded-lg border border-[var(--d-admin-surface-border)] border-dashed">
            <div className="rounded-full bg-gray-500/10 p-4">
              <Icon
                icon="ph:github-logo-duotone"
                className="h-12 w-12 text-[var(--d-admin-text-color)]"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-[var(--d-admin-text-color)]">
                Connect GitHub
              </h3>
              <p className="text-sm text-[var(--d-admin-text-color-secondary)]">
                Sign in to create repositories and push code.
              </p>
            </div>
            <button
              onClick={() => signIn('github')}
              className="mt-2 flex items-center gap-2 rounded-md bg-[#24292F] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Icon icon="ph:github-logo-fill" className="text-lg" />
              Sign in with GitHub
            </button>
          </div>
        ) : isGoogleUser && !isGitHubConnected ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center bg-[var(--d-admin-surface-section)] rounded-lg border border-[var(--d-admin-surface-border)] border-dashed">
              <div className="rounded-full bg-gray-500/10 p-4">
                <Icon
                  icon="ph:github-logo-duotone"
                  className="h-12 w-12 text-[var(--d-admin-text-color)]"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-[var(--d-admin-text-color)]">
                  Connect Your GitHub Account
                </h3>
                <p className="text-sm text-[var(--d-admin-text-color-secondary)] max-w-sm">
                  To push your project to GitHub, you need to connect your
                  GitHub account. This allows us to create repositories and push
                  code on your behalf.
                </p>
              </div>
              <button
                onClick={handleConnectGitHub}
                className="mt-2 flex items-center gap-2 rounded-md bg-[#24292F] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Icon icon="ph:github-logo-fill" className="text-lg" />
                Connect GitHub
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-3">
              <Icon icon="ph:google-logo" className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-xs text-[var(--d-admin-text-color-secondary)]">
                  Signed in with Google as
                </p>
                <p className="text-sm font-medium text-[var(--d-admin-text-color)]">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] p-3">
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--d-admin-text-color)]">
                    {session.user?.name}
                  </span>
                  <span className="text-xs text-[var(--d-admin-text-color-secondary)]">
                    GitHub Connected
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--d-admin-text-color)]">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="my-awesome-project"
                  className="w-full rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-background)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] placeholder-[var(--d-admin-text-color-secondary)] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="private-repo"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="private-repo"
                  className="text-sm text-[var(--d-admin-text-color)]"
                >
                  Private Repository
                </label>
              </div>

              {hasDeployment && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="website-link"
                    checked={isWebsiteLinkAttached}
                    onChange={(e) => setIsWebsiteLinkAttached(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="website-link"
                    className="text-sm text-[var(--d-admin-text-color)]"
                  >
                    Website link attached
                  </label>
                </div>
              )}
            </div>

            <button
              onClick={handlePushToGitHub}
              disabled={isPushing || !repoName}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPushing ? (
                <>
                  <Icon
                    icon="ph:spinner-gap-bold"
                    className="animate-spin text-lg"
                  />
                  Pushing...
                </>
              ) : (
                <>
                  <Icon icon="ph:upload-simple-duotone" className="text-lg" />
                  Push to GitHub
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
