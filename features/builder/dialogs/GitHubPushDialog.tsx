import { useState, useEffect, useMemo } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Cloud, 
  FileCode, 
  CheckCircle2, 
  Loader2, 
  ExternalLink,
  ArrowRight,
  Shield,
  ShieldOff,
  Clock,
  ChevronRight,
  X
} from 'lucide-react';
import { Icon } from '@iconify/react';
import { GitHubService } from '../lib/github';
import { toast } from 'react-toastify';
import { useProjectsStore } from '../store/projects-store';
import { useBuilderStore } from '../store/builder-store';
import { generateReactProjectFiles } from '../lib/export-utils';
import { formatDistanceToNow } from 'date-fns';
import { useSettingsStore } from '@/features/settings/store/useSettingsStore';

interface GitHubPushDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GitHubPushDialog({
  isOpen,
  onClose,
}: GitHubPushDialogProps) {
  const { currentProjectId, getProject, updateProject } = useProjectsStore();
  const project = currentProjectId ? getProject(currentProjectId) : null;
  const { history, historyIndex } = useBuilderStore();
  const currentHtml = history[historyIndex] || '';
  const pages = project?.pages || [];

  const [repoName, setRepoName] = useState(() => {
    if (project?.name) {
      return project.name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    return 'my-project';
  });

  const [isPrivate, setIsPrivate] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isWebsiteLinkAttached, setIsWebsiteLinkAttached] = useState(true);
  const [pushStep, setPushStep] = useState<'idle' | 'preparing' | 'creating' | 'pushing' | 'success'>('idle');
  const [pushedRepoUrl, setPushedRepoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (project?.name) {
        setRepoName(project.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
      }
      setPushStep('idle');
      setIsPushing(false);
    }
  }, [isOpen, project?.name]);

  const { github: manualTokens } = useSettingsStore();
  const manualToken = manualTokens.length > 0 ? manualTokens[0] : null;

  const isGitHubConnected = !!manualToken;

  const handlePushToGitHub = async () => {
    const token = manualToken;

    if (!token) {
      toast.error('Not authenticated with GitHub');
      return;
    }

    if (token === manualToken) {
      toast.info('Using manual GitHub token for deployment');
    }

    if (!repoName.trim()) {
      toast.error('Repository name is required');
      return;
    }

    let finalPages = pages;
    if (finalPages.length === 0 && currentHtml) {
      finalPages = [{ id: 'home', name: 'Home', path: '/index', html: currentHtml }];
    }

    if (finalPages.length === 0) {
      toast.error('No project or pages to push. Please add some content first.');
      return;
    }

    try {
      setIsPushing(true);
      setPushStep('preparing');

      const ghService = new GitHubService(token as string);
      let repo;
      const homepage = isWebsiteLinkAttached ? project?.deploymentUrl : undefined;

      // Small delay for UI feel
      await new Promise(r => setTimeout(r, 800));
      setPushStep('creating');

      try {
        repo = await ghService.createRepository(repoName, isPrivate, homepage);
      } catch (error: any) {
        if (error.message === 'Repository already exists') {
          let owner = undefined;
          if (!owner) {
            const user = await ghService.getUser();
            owner = user.login;
          }
          repo = { owner: { login: owner }, name: repoName, html_url: `https://github.com/${owner}/${repoName}` };
        } else {
          throw error;
        }
      }

      setPushStep('pushing');
      const files = await generateReactProjectFiles(finalPages, repoName);

      await ghService.pushToRepository(
        repo.owner.login,
        repo.name,
        files as any,
        `Update from AI Website Builder: ${new Date().toLocaleString()}`,
      );

      // Update project last pushed time
      if (currentProjectId) {
        updateProject(currentProjectId, { lastPushedAt: Date.now() });
      }

      setPushedRepoUrl(repo.html_url || `https://github.com/${repo.owner.login}/${repo.name}`);
      setPushStep('success');
      toast.success('Successfully pushed to GitHub!');
    } catch (error: any) {
      console.error('GitHub Push Error:', error);
      toast.error(`Failed to push to GitHub: ${error.message}`);
      setIsPushing(false);
      setPushStep('idle');
    }
  };

  const handleConnectGitHub = () => {
    toast.info('Please connect a manual token from settings in this version.');
  };

  const steps = [
    { id: 'preparing', label: 'Preparing files', icon: <FileCode className="size-4" /> },
    { id: 'creating', label: 'Linking repository', icon: <Github className="size-4" /> },
    { id: 'pushing', label: 'Uploading components', icon: <Cloud className="size-4" /> },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === pushStep);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !isPushing && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 focus:outline-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--d-admin-surface-border)] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color)]">
                  <Github className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--d-admin-text-color)]">Push to GitHub</h2>
                  <p className="text-xs text-[var(--d-admin-text-color-secondary)]">Create a repository for your project</p>
                </div>
              </div>
              <button
                disabled={isPushing}
                onClick={onClose}
                className="rounded-lg p-2 text-[var(--d-admin-text-color-secondary)] transition-colors hover:bg-[var(--d-admin-surface-hover)] hover:text-[var(--d-admin-text-color)] disabled:opacity-30"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {pushStep === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="relative mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500"
                      >
                        <CheckCircle2 className="size-12" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full bg-green-500/20"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--d-admin-text-color)]">Push Successful!</h3>
                    <p className="mt-2 text-[var(--d-admin-text-color-secondary)] max-w-sm">
                      Your project has been successfully linked and uploaded to GitHub.
                    </p>

                    <a
                      href={pushedRepoUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--d-admin-blue-600)] py-3.5 font-semibold text-white transition-all hover:bg-[var(--d-admin-blue-700)] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                    >
                      View on GitHub
                      <ExternalLink className="size-4" />
                    </a>
                  </motion.div>
                ) : isPushing ? (
                  <motion.div
                    key="pushing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center py-4"
                  >
                    {/* Animated File Sync Visualization */}
                    <div className="relative mb-12 flex h-32 w-full items-center justify-center gap-16 px-12">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] shadow-inner">
                        <FileCode className="size-8 text-blue-500" />
                        <span className="absolute -bottom-6 text-[10px] font-medium uppercase tracking-wider opacity-50">Local Project</span>
                      </div>

                      <div className="relative flex h-1 w-24">
                        <motion.div
                          className="h-full w-full rounded-full bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          style={{ backgroundSize: '200% 100%' }}
                        />

                        <AnimatePresence>
                          {[1, 2, 3].map(i => (
                            <motion.div
                              key={i}
                              initial={{ x: -20, opacity: 0, scale: 0.5 }}
                              animate={{ x: 80, opacity: [0, 1, 0], scale: 1 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                delay: i * 0.4,
                                ease: "easeInOut"
                              }}
                              className="absolute top-1/2 -translate-y-1/2 text-blue-500"
                            >
                              <FileCode className="size-4" />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--d-admin-surface-section)] border border-[var(--d-admin-surface-border)] shadow-inner">
                        <Github className="size-8 text-[var(--d-admin-text-color)]" />
                        <span className="absolute -bottom-6 text-[10px] font-medium uppercase tracking-wider opacity-50">GitHub Cloud</span>
                      </div>
                    </div>

                    {/* Steps Tracker */}
                    <div className="w-full space-y-4 rounded-2xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] p-5 shadow-sm">
                      {steps.map((s, idx) => (
                        <div key={s.id} className="flex items-center gap-4">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                            currentStepIndex > idx
                              ? 'bg-green-500 border-green-500 text-white'
                              : currentStepIndex === idx
                                ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                                : 'bg-transparent border-[var(--d-admin-surface-border)] text-[var(--d-admin-text-color-secondary)]'
                          }`}>
                            {currentStepIndex > idx ? <CheckCircle2 className="size-5" /> : currentStepIndex === idx ? <Loader2 className="size-4 animate-spin" /> : s.icon}
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span className={`text-sm font-medium transition-colors ${currentStepIndex >= idx ? 'text-[var(--d-admin-text-color)]' : 'text-[var(--d-admin-text-color-secondary)]'}`}>
                              {s.label}
                            </span>
                            {currentStepIndex === idx && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] text-blue-500 font-semibold"
                              >
                                PROCESSING...
                              </motion.span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 text-sm text-[var(--d-admin-text-color-secondary)] animate-pulse flex items-center gap-2">
                       Please don't close this window
                    </p>
                  </motion.div>
                ) : !isGitHubConnected ? (
                  <motion.div
                    key="disconnected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                     <div className="mb-6 rounded-full bg-blue-500/10 p-5">
                       <Cloud className="size-12 text-blue-500" />
                     </div>
                     <h3 className="text-xl font-bold text-[var(--d-admin-text-color)]">Connect your GitHub</h3>
                     <p className="mt-2 text-sm text-[var(--d-admin-text-color-secondary)] max-w-sm">
                       Sign in to create repositories and push code directly from the builder.
                     </p>
                     <button
                       onClick={handleConnectGitHub}
                       className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#24292F] py-3.5 font-semibold text-white transition-all hover:bg-[#24292F]/90 active:scale-[0.98] shadow-lg shadow-black/20"
                     >
                       <GitHubIcon />
                       Continue with GitHub
                     </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="setup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between rounded-xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                           <Github className="size-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--d-admin-text-color)]">GitHub User</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-green-500 uppercase tracking-widest">
                             <span className="block size-1.5 rounded-full bg-green-500 animate-pulse" />
                             Connected
                          </div>
                        </div>
                      </div>
                      {project?.lastPushedAt && (
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] text-[var(--d-admin-text-color-secondary)] uppercase font-bold tracking-tight">Last Pushed</span>
                           <div className="flex items-center gap-1 text-xs text-[var(--d-admin-text-color)]">
                              <Clock className="size-3 opacity-50" />
                              {formatDistanceToNow(project.lastPushedAt)} ago
                           </div>
                        </div>
                      )}
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--d-admin-text-color-secondary)] px-1">
                          <FileCode className="size-3.5" />
                          Repository Name
                        </label>
                        <div className="group relative">
                          <input
                            type="text"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            placeholder="my-awesome-vibe-code"
                            className="w-full rounded-xl border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] px-4 py-3.5 text-[var(--d-admin-text-color)] transition-all placeholder:text-[var(--d-admin-text-color-secondary)]/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--d-admin-text-color-secondary)] group-focus-within:text-blue-500 transition-colors">
                            <ArrowRight className="size-4" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setIsPrivate(!isPrivate)}
                          className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                            isPrivate
                              ? 'border-blue-500/20 bg-blue-500/5 text-blue-500'
                              : 'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isPrivate ? <Shield className="size-4" /> : <ShieldOff className="size-4" />}
                            <span className="text-xs font-semibold">Private</span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border-2 transition-all ${isPrivate ? 'bg-blue-500 border-blue-500' : 'border-[var(--d-admin-surface-border)]'}`} />
                        </button>

                        <button
                          onClick={() => setIsWebsiteLinkAttached(!isWebsiteLinkAttached)}
                          className={`flex items-center justify-between rounded-xl border p-3.5 transition-all ${
                            isWebsiteLinkAttached
                              ? 'border-blue-500/20 bg-blue-500/5 text-blue-500'
                              : 'border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] text-[var(--d-admin-text-color-secondary)] hover:bg-[var(--d-admin-surface-hover)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <ExternalLink className="size-4" />
                            <span className="text-xs font-semibold">Attach URL</span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border-2 transition-all ${isWebsiteLinkAttached ? 'bg-blue-500 border-blue-500' : 'border-[var(--d-admin-surface-border)]'}`} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handlePushToGitHub}
                      disabled={isPushing || !repoName}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--d-admin-blue-600)] py-4 font-bold text-white transition-all hover:bg-[var(--d-admin-blue-700)] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50"
                    >
                      <motion.div
                        initial={false}
                        animate={isPushing ? { y: 30 } : { y: 0 }}
                        className="flex items-center gap-2"
                      >
                         <Github className="size-5" />
                         <span>Deploy to GitHub</span>
                         <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function GitHubIcon() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}
