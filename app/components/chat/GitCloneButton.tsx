import ignore from 'ignore';
import { useGit } from '~/lib/hooks/useGit';
import type { Message } from 'ai';

const IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  '.github/**',
  '.vscode/**',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.png',
  'dist/**',
  'build/**',
  '.next/**',
  'coverage/**',
  '.cache/**',
  '.vscode/**',
  '.idea/**',
  '**/*.log',
  '**/.DS_Store',
  '**/npm-debug.log*',
  '**/yarn-debug.log*',
  '**/yarn-error.log*',
  '**/*lock.json',
  '**/*lock.yaml',
];

const ig = ignore().add(IGNORE_PATTERNS);
const generateId = () => Math.random().toString(36).substring(2, 15);

interface UseCloneRepoProps {
  className?: string;
  importChat?: (description: string, messages: Message[]) => Promise<void>;
}

export default function useCloneRepo({ importChat }: UseCloneRepoProps) {
  const { ready, gitClone } = useGit();
  const cloneRepo = async () => {
    if (!ready) {
      return;
    }

    const repoUrl = 'https://github.com/francesco-sardo-shopify/polaris-remix/';

    if (repoUrl) {
      const { workdir, data } = await gitClone(repoUrl);

      if (importChat) {
        const filePaths = Object.keys(data).filter((filePath) => !ig.ignores(filePath));
        console.log(filePaths);

        const textDecoder = new TextDecoder('utf-8');
        const message: Message = {
          role: 'assistant',
          content: `Cloning the repo ${repoUrl} into ${workdir}
<boltArtifact id="imported-files" title="Git Cloned Files" type="bundled" >
          ${filePaths
            .map((filePath) => {
              const { data: content, encoding } = data[filePath];

              if (encoding === 'utf8') {
                return `<boltAction type="file" filePath="${filePath}">
${content}
</boltAction>`;
              } else if (content instanceof Uint8Array) {
                return `<boltAction type="file" filePath="${filePath}">
${textDecoder.decode(content)}
</boltAction>`;
              } else {
                return '';
              }
            })
            .join('\n')}
 </boltArtifact>`,
          id: generateId(),
          createdAt: new Date(),
        };
        console.log(JSON.stringify(message));

        importChat(`Git Project:${repoUrl.split('/').slice(-1)[0]}`, [message]);

        // console.log(files);
      }
    }
  };

  return { cloneRepo };
}
