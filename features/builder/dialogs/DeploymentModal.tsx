'use client';

import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  Rocket,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  Trash2,
  ArrowLeft,
  X,
} from 'lucide-react';
import { classMixin } from '../lib/class-utils';
import { useProjectsStore } from '../store/projects-store';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  currentHtml: string;
  deploymentFormat: 'html' | 'react';
}

const DEPLOYMENT_STEPS = [
  { id: 1, label: 'Initiating deployment...', duration: 1000 },
  { id: 2, label: 'Building project files...', duration: 2000 },
  { id: 3, label: 'Optimizing assets...', duration: 1500 },
  { id: 4, label: 'Uploading to Vercel...', duration: 2000 },
  { id: 5, label: 'Finalizing deployment...', duration: 1000 },
];

export function DeploymentModal({
  isOpen,
  onClose,
  project,
  currentHtml,
  deploymentFormat,
}: DeploymentModalProps) {
  const { saveProject, currentProjectId, setCurrentProject } =
    useProjectsStore();

  const [projectName, setProjectName] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<
    'idle' | 'deploying' | 'success' | 'error'
  >('idle');
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([]);
  const [errorLogs, setErrorLogs] = useState('');
  const [isFixing, setIsFixing] = useState(false);
  const [suggestedFixes, setSuggestedFixes] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && !projectName) {
      if (project?.name) {
        setProjectName(project.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
      } else {
        const uniqueSuffix = Math.random().toString(36).substring(2, 7);
        setProjectName(`my-page-${uniqueSuffix}`);
      }
    }
  }, [isOpen, project]);

  const extractUploadedImageUrls = (htmlContent: string): string[] => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    const urls: string[] = [];
    let match;

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      const url = match[1];
      if (url.includes('/uploaded/')) {
        urls.push(url);
      }
    }

    return Array.from(new Set(urls));
  };

  const fetchImageAsBase64 = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Failed to fetch image: ${imageUrl}`, error);
      return imageUrl;
    }
  };

  const pollDeploymentStatus = async (
    deploymentId: string,
    teamId?: string,
  ) => {
    const pollInterval = setInterval(async () => {
      try {
        const url = teamId
          ? `/api/deploy/status?id=${deploymentId}&teamId=${teamId}`
          : `/api/deploy/status?id=${deploymentId}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          if (data.status === 'QUEUED' || data.status === 'INITIALIZING') {
            setCurrentStep(1);
            setProgress(10);
          } else if (
            data.status === 'BUILDING' ||
            data.status === 'ANALYZING'
          ) {
            setCurrentStep(2);
            setProgress((prev) => Math.min(prev + 1, 60));
          } else if (data.status === 'DEPLOYING') {
            setCurrentStep(4);
            setProgress(80);
          } else if (data.status === 'READY') {
            clearInterval(pollInterval);
            setCurrentStep(6);
            setProgress(100);

            setTimeout(() => {
              setDeploymentStatus('success');
              setDeploymentUrl(data.url);
              setIsDeploying(false);

              // Save project with deployment URL
              saveProjectWithDeploymentUrl(data.url);
            }, 2000);
          } else if (data.status === 'ERROR' || data.status === 'CANCELED') {
            clearInterval(pollInterval);
            setDeploymentStatus('error');
            setErrorMessage(
              data.error?.message ||
                'Deployment failed or was canceled by Vercel.',
            );
            setErrorLogs(
              data.error?.logs || JSON.stringify(data.error || {}, null, 2),
            );
            setIsDeploying(false);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000);
  };

  const saveProjectWithDeploymentUrl = async (url: string) => {
    const projectId = currentProjectId || `project-${Date.now()}`;
    let thumbnail = '';
    try {
      const editor = document.getElementById('editor');
      if (editor) {
        const { toJpeg } = await import('html-to-image');
        thumbnail = await toJpeg(editor, {
          quality: 0.95,
          pixelRatio: 0.6,
          backgroundColor: '#1a1a1a',
        });
      }
    } catch (error) {
      console.error('Failed to generate thumbnail during deployment:', error);
    }
    if (project) {
      const { updatedAt, ...rest } = project;
      saveProject({
        ...rest,
        deploymentUrl: url,
        thumbnail: thumbnail || project.thumbnail,
      });
    } else {
      saveProject({
        id: projectId,
        name: projectName,
        description: '',
        pages: [
          {
            id: 'home',
            name: 'Home',
            path: '/index',
            html: currentHtml,
          },
        ],
        deploymentUrl: url,
        thumbnail,
        category: 'custom',
      });
      setCurrentProject(projectId);
    }
  };

  const processHtmlForDeploy = async (html: string, pageName: string) => {
    const imageUrls = extractUploadedImageUrls(html);
    let processedHtml = html;

    for (const imageUrl of imageUrls) {
      const base64 = await fetchImageAsBase64(imageUrl);
      processedHtml = processedHtml.replace(
        new RegExp(imageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        base64,
      );
    }

    if (project && project.pages.length > 1) {
      project.pages.forEach((p: any) => {
        const path = p.path;
        const fileName =
          path === '/index' || path === '/'
            ? 'index.html'
            : `${path.replace(/^\//, '')}.html`;
        const regex = new RegExp(`href=["']${path}["']`, 'g');
        processedHtml = processedHtml.replace(regex, `href="${fileName}"`);
      });
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageName}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"></link>
</head>
<body>
${processedHtml}
</body>
</html>`;
  };

  const handleDeploy = async () => {
    if (!projectName) return;
    const hasProjectPages =
      project && project.pages && project.pages.length > 0;
    if (!hasProjectPages && !currentHtml) return;

    setIsDeploying(true);
    setDeploymentStatus('deploying');
    setErrorMessage('');
    setCurrentStep(0);
    setProgress(0);

    try {
      const deploymentFiles = [];

      if (hasProjectPages) {
        for (const page of project.pages) {
          const fullHTML = await processHtmlForDeploy(page.html, page.name);
          const filename =
            page.path === '/index' || page.path === '/'
              ? 'index.html'
              : `${page.path.replace(/^\//, '')}.html`;

          deploymentFiles.push({
            path: filename,
            content: fullHTML,
          });
        }
      } else {
        const fullHTML = await processHtmlForDeploy(currentHtml, projectName);
        deploymentFiles.push({
          path: 'index.html',
          content: fullHTML,
        });
      }

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectName,
          files: deploymentFiles,
          framework: null,
          envVars: showAdvanced ? envVars : [],
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        await pollDeploymentStatus(result.deploymentId, result.teamId);
      } else {
        throw new Error(result.error || 'Deployment failed');
      }
    } catch (error: any) {
      console.error('Deployment error:', error);
      setDeploymentStatus('error');
      setErrorMessage(error.message || 'An error occurred during deployment');
      setErrorLogs(error.stack || error.toString());
      setIsDeploying(false);
    }
  };

  const handleAIFix = async () => {
    setIsFixing(true);
    setSuggestedFixes([]);
    const htmlToFix =
      currentHtml ||
      project?.pages?.find((p: any) => p.path === '/index')?.html ||
      '';

    try {
      const response = await fetch('/api/fix-deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorLogs,
          htmlContent: htmlToFix,
          projectName,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuggestedFixes(result.fixes || []);

        if (result.fixedHtml) {
          localStorage.setItem('drag-drop-builder-html', result.fixedHtml);
        }

        setTimeout(async () => {
          setIsFixing(false);
          await handleDeploy();
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to fix deployment');
      }
    } catch (error: any) {
      console.error('AI fix error:', error);
      setErrorMessage(`AI Fix Failed: ${error.message}`);
      setIsFixing(false);
    }
  };

  const handleClose = () => {
    if (!isDeploying) {
      setDeploymentStatus('idle');
      setDeploymentUrl('');
      setErrorMessage('');
      setProgress(0);
      setCurrentStep(0);
      onClose();
    }
  };

  const hasContent =
    project?.pages?.length > 0 || currentHtml.trim().length > 0;
  const allHtml = project?.pages
    ? project.pages.map((p: any) => p.html).join('')
    : currentHtml;
  const imageCount = extractUploadedImageUrls(allHtml).length;
  const pageCount = project?.pages?.length || 1;

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isDeploying) {
          handleClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-[1px]" />
        <DialogPrimitive.Content
          className={classMixin(
            'fixed z-[9999] rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] shadow-2xl',
            'w-[95vw] max-w-lg overflow-y-auto',
            'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform',
            'animate-in zoom-in-95 duration-200',
          )}
          onPointerDownOutside={(e) => {
            if (isDeploying) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (isDeploying) {
              e.preventDefault();
            }
          }}
        >
          <div
            className={`sticky top-0 z-10 flex items-center justify-end ${deploymentStatus !== 'deploying' ? 'border-b border-[var(--d-admin-surface-border)]' : ''} bg-[var(--d-admin-surface-ground)] px-6 py-4`}
          >
            <DialogPrimitive.Title className="sr-only">
              Deploy to Vercel
            </DialogPrimitive.Title>
            {!isDeploying && (
              <button
                onClick={handleClose}
                className="hover:bg-surface-c hover:text-text rounded-md p-2 text-[var(--d-admin-surface-text-secondary)] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className={deploymentStatus === 'deploying' ? '' : 'p-6'}>
            {deploymentStatus === 'idle' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-3">
                    <Rocket className="h-6 w-6 text-[var(--d-admin-surface-text-primary)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--d-admin-surface-text-primary)]">
                      Deploy to Vercel
                    </h2>
                    <p className="text-sm text-[var(--d-admin-surface-text-secondary)]">
                      Deploy your website to a global edge network
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--d-admin-surface-text-primary)]">
                      Project Name
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) =>
                          setProjectName(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-]/g, '-'),
                          )
                        }
                        placeholder="my-awesome-website"
                        className="text-primary focus:ring-primary flex-1 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-3 py-2 focus:ring-2 focus:outline-none"
                      />
                      <div className="text-text-secondary rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-3 py-2">
                        .vercel.app
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-primary mb-2 block text-sm font-medium">
                      Project Stats
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-3 text-center">
                        <div className="text-xl font-bold text-blue-500">
                          {pageCount}
                        </div>
                        <div className="text-text-secondary text-xs">
                          {pageCount === 1 ? 'Page' : 'Pages'}
                        </div>
                      </div>
                      <div className="rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-3 text-center">
                        <div className="text-xl font-bold text-green-500">
                          {imageCount}
                        </div>
                        <div className="text-text-secondary text-xs">
                          Images
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[var(--d-admin-surface-border)] pt-4">
                    <div className="mb-4 flex items-center gap-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={showAdvanced}
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full bg-[var(--d-admin-surface-section)] transition-colors ${
                          showAdvanced ? 'bg-primary' : 'bg-surface-d'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-[var(--d-admin-surface-ground)] transition-transform ${
                            showAdvanced ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <label
                        className="text-primary cursor-pointer text-sm font-medium"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                      >
                        Advanced Configuration
                      </label>
                    </div>

                    {showAdvanced && (
                      <div className="space-y-4 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <label className="block text-sm font-medium text-[var(--d-admin-text-color)]">
                              Environment Variables
                            </label>
                            <button
                              onClick={() =>
                                setEnvVars([...envVars, { key: '', value: '' }])
                              }
                              className="flex items-center gap-1 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-card)] px-2 py-1 text-xs text-[var(--d-admin-text-color)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                            >
                              <Plus className="h-3 w-3" />
                              Add
                            </button>
                          </div>
                          <div className="space-y-2">
                            {envVars.map((env, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={env.key}
                                  onChange={(e) => {
                                    const newEnvVars = [...envVars];
                                    newEnvVars[index].key = e.target.value;
                                    setEnvVars(newEnvVars);
                                  }}
                                  placeholder="KEY"
                                  className="flex-1 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-card)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--d-admin-blue-600)]"
                                />
                                <input
                                  type="text"
                                  value={env.value}
                                  onChange={(e) => {
                                    const newEnvVars = [...envVars];
                                    newEnvVars[index].value = e.target.value;
                                    setEnvVars(newEnvVars);
                                  }}
                                  placeholder="Value"
                                  className="flex-1 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-card)] px-3 py-2 text-sm text-[var(--d-admin-text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--d-admin-blue-600)]"
                                />
                                <button
                                  onClick={() => {
                                    const newEnvVars = envVars.filter(
                                      (_, i) => i !== index,
                                    );
                                    setEnvVars(newEnvVars);
                                  }}
                                  className="rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-card)] px-3 py-2 text-[var(--d-admin-red-600)] transition-colors hover:bg-[var(--d-admin-surface-hover)]"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                            {envVars.length === 0 && (
                              <p className="text-sm text-[var(--d-admin-text-color-secondary)]">
                                No environment variables added.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 border-t border-[var(--d-admin-surface-border)] pt-4">
                  <button
                    onClick={handleClose}
                    className="text-primary flex-1 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-4 py-2 font-medium transition-colors hover:bg-[var(--d-admin-surface-ground)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeploy}
                    disabled={!projectName || !hasContent}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-primary-color)] px-4 py-2 font-medium text-[var(--d-admin-primary-text)] transition-colors hover:bg-[var(--d-admin-primary-color)]/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Rocket className="h-4 w-4" />
                    Deploy to Vercel
                  </button>
                </div>

                {!hasContent && (
                  <p className="text-warning text-center text-sm">
                    No content found. Please create a page first.
                  </p>
                )}
              </div>
            )}

            {deploymentStatus === 'deploying' && (
              <div className="flex flex-col items-center justify-center py-8 px-6 text-center">
                <div className="mb-6">
                  <div className="bg-primary/20 flex h-16 w-16 items-center justify-center rounded-full">
                    <Loader2 className="text-primary h-8 w-8 animate-spin" />
                  </div>
                </div>

                <h2 className="text-primary mb-2 text-xl font-bold">
                  Deploying to Vercel
                </h2>
                <p className="text-text-secondary mb-6 text-sm">
                  Please wait while we build and deploy your application
                </p>

                <div className="mb-8 w-full max-w-md relative">
                  <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-[var(--d-admin-surface-border)] -z-10" />

                  <div className="space-y-6">
                    {DEPLOYMENT_STEPS.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-start gap-4 text-left"
                      >
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            currentStep > step.id
                              ? 'bg-green-500 border-green-500'
                              : currentStep === step.id
                                ? 'bg-[var(--d-admin-surface-ground)] border-[var(--d-admin-primary-color)]'
                                : 'bg-[var(--d-admin-surface-section)] border-[var(--d-admin-surface-border)]'
                          }`}
                        >
                          {currentStep > step.id && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                          )}
                          {currentStep === step.id && (
                            <div className="h-2 w-2 rounded-full bg-[var(--d-admin-primary-color)] animate-pulse" />
                          )}
                        </div>
                        <div className="flex flex-col pt-0.5">
                          <span
                            className={`text-sm leading-tight transition-colors ${currentStep >= step.id ? 'text-[var(--d-admin-text-color)] font-medium' : 'text-[var(--d-admin-text-color-secondary)]'}`}
                          >
                            {step.label}
                          </span>
                          {currentStep === step.id && (
                            <span className="text-xs text-[var(--d-admin-primary-color)] mt-1 animate-pulse">
                              Processing...
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-md">
                  <div className="h-3 w-full overflow-hidden rounded-full border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] shadow-sm">
                    <div
                      className="h-full bg-[var(--d-admin-primary-color)] transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {deploymentStatus === 'success' && (
              <div className="">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle2 className="h-7 w-7 text-green-500" />
                  </div>
                  <h2 className="text-primary mb-2 text-2xl font-bold">
                    Deployment Successful!
                  </h2>
                  <p className="text-text-secondary text-sm">
                    Your website is now live on Vercel
                  </p>
                </div>

                <div className="space-y-3 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[var(--d-admin-surface-text-secondary)]">
                      Deployment URL
                    </label>
                    <a
                      href={deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[var(--d-admin-primary-color)] hover:underline"
                    >
                      {deploymentUrl.replace('https://', '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-[var(--d-admin-surface-text-secondary)]">
                        Status
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm text-[var(--d-admin-surface-text-primary)]">
                          Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-4 py-2 font-medium text-[var(--d-admin-primary-color)] transition-colors hover:bg-[var(--d-admin-surface-ground)]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Builder
                  </button>
                  <a
                    href={deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-primary-color)] px-4 py-2 text-center font-medium text-[var(--d-admin-primary-text)] transition-colors hover:bg-[var(--d-admin-primary-color)]/90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </a>
                </div>
              </div>
            )}

            {deploymentStatus === 'error' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
                    <XCircle className="h-7 w-7 text-red-500" />
                  </div>
                  <h2 className="text-primary mb-2 text-2xl font-bold">
                    Deployment Failed
                  </h2>
                  <p className="text-text-secondary text-sm">
                    We encountered an error while deploying
                  </p>
                </div>

                {errorMessage && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </div>
                )}
                {errorLogs && (
                  <details className="mb-6 rounded-lg border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] p-4">
                    <summary className="cursor-pointer text-sm font-medium text-[var(--d-admin-text-color)] transition-colors hover:text-[var(--d-admin-blue-600)]">
                      📋 View Error Logs
                    </summary>
                    <pre className="mt-3 max-h-64 overflow-x-auto overflow-y-auto rounded border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-section)] p-3 text-xs whitespace-pre-wrap text-[var(--d-admin-text-color-secondary)]">
                      {errorLogs}
                    </pre>
                  </details>
                )}

                {suggestedFixes.length > 0 && (
                  <div className="mb-6 rounded-lg border border-[var(--d-admin-blue-200)] bg-[var(--d-admin-blue-50)] p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--d-admin-blue-900)]">
                      <span>✨</span> AI Suggested Fixes:
                    </h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-[var(--d-admin-blue-700)]">
                      {suggestedFixes.map((fix, index) => (
                        <li key={index}>{fix}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAIFix}
                    disabled={isFixing}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--d-admin-blue-600)] px-4 py-2 font-medium text-white transition-colors hover:bg-[var(--d-admin-blue-700)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isFixing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing & Fixing...
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        Fix with AI
                      </>
                    )}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--d-admin-surface-border)] bg-[var(--d-admin-surface-ground)] px-4 py-2 font-medium text-[var(--d-admin-primary-color)] transition-colors hover:bg-[var(--d-admin-surface-ground)]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      onClick={handleDeploy}
                      disabled={isFixing}
                      className="flex-1 rounded-md border border-transparent bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
