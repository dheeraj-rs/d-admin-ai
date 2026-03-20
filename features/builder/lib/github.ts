import { Octokit } from '@octokit/rest';

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  async getUser() {
    const { data } = await this.octokit.users.getAuthenticated();
    return data;
  }

  async createRepository(
    name: string,
    isPrivate: boolean = false,
    homepage?: string,
  ) {
    try {
      const { data } = await this.octokit.repos.createForAuthenticatedUser({
        name,
        private: isPrivate,
        auto_init: true,
        homepage,
      });
      return data;
    } catch (error: any) {
      if (error.status === 422) {
        throw new Error('Repository already exists');
      }
      throw error;
    }
  }

  async updateRepository(
    owner: string,
    repo: string,
    data: { homepage?: string },
  ) {
    const { data: response } = await this.octokit.repos.update({
      owner,
      repo,
      ...data,
    });
    return response;
  }

  async pushToRepository(
    owner: string,
    repo: string,
    files: Record<string, any>,
    commitMessage: string = 'Initial commit from Drag Drop Builder',
  ) {
    const { data: refData } = await this.octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main',
    });
    const latestCommitSha = refData.object.sha;

    const { data: commitData } = await this.octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.tree.sha;

    const treeItems = [];

    const prefix = '/home/project';

    for (const [path, dirent] of Object.entries(files)) {
      if (!dirent || dirent.type !== 'file') continue;
      if (!path.startsWith(prefix)) continue;

      let relPath = path.substring(prefix.length);
      if (relPath.startsWith('/')) relPath = relPath.substring(1);
      if (!relPath) continue;

      if (
        relPath.includes('node_modules') ||
        relPath.includes('.next') ||
        relPath.includes('.git')
      ) {
        continue;
      }

      const { data: blobData } = await this.octokit.git.createBlob({
        owner,
        repo,
        content: dirent.content,
        encoding: dirent.isBinary ? 'base64' : 'utf-8',
      });

      treeItems.push({
        path: relPath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha,
      });
    }

    if (treeItems.length === 0) {
      return;
    }

    const { data: treeData } = await this.octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: treeItems as any,
    });

    const { data: newCommitData } = await this.octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: treeData.sha,
      parents: [latestCommitSha],
    });

    await this.octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: newCommitData.sha,
    });

    return newCommitData;
  }
}
