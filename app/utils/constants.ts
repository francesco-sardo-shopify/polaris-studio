import Cookies from 'js-cookie';
import type { ModelInfo } from './types';
import type { ProviderInfo } from '~/types/model';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'anthropic:claude-3-5-sonnet-v2@20241022'; // google:gemini-1.5-pro-001 // openai:gpt-4o-2024-08-06 // anthropic:claude-3-5-sonnet-v2@20241022
export const PROMPT_COOKIE_KEY = 'cachedPrompt';

const PROVIDER_LIST: ProviderInfo[] = [
  {
    name: 'OpenAILike',
    staticModels: [],
    getDynamicModels: getOpenAILikeModels,
  },
];

export const DEFAULT_PROVIDER = PROVIDER_LIST[0];

const staticModels: ModelInfo[] = PROVIDER_LIST.map((p) => p.staticModels).flat();

export let MODEL_LIST: ModelInfo[] = [...staticModels];

export async function getModelList(apiKeys: Record<string, string>) {
  MODEL_LIST = [
    ...(
      await Promise.all(
        PROVIDER_LIST.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(apiKeys)),
      )
    ).flat(),
    ...staticModels,
  ];
  return MODEL_LIST;
}

async function getOpenAILikeModels(): Promise<ModelInfo[]> {
  try {
    const baseUrl = import.meta.env.OPENAI_LIKE_API_BASE_URL || '';

    if (!baseUrl) {
      return [];
    }

    let apiKey = import.meta.env.OPENAI_LIKE_API_KEY ?? '';

    const apikeys = JSON.parse(Cookies.get('apiKeys') || '{}');

    if (apikeys && apikeys.OpenAILike) {
      apiKey = apikeys.OpenAILike;
    }

    const response = await fetch(`${baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const res = (await response.json()) as any;

    return res.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'OpenAILike',
    }));
  } catch (e) {
    console.error('Error getting OpenAILike models:', e);
    return [];
  }
}

async function initializeModelList(): Promise<ModelInfo[]> {
  let apiKeys: Record<string, string> = {};

  try {
    const storedApiKeys = Cookies.get('apiKeys');

    if (storedApiKeys) {
      const parsedKeys = JSON.parse(storedApiKeys);

      if (typeof parsedKeys === 'object' && parsedKeys !== null) {
        apiKeys = parsedKeys;
      }
    }
  } catch (error: any) {
    console.warn(`Failed to fetch apikeys from cookies:${error?.message}`);
  }
  MODEL_LIST = [
    ...(
      await Promise.all(
        PROVIDER_LIST.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(apiKeys)),
      )
    ).flat(),
    ...staticModels,
  ];

  return MODEL_LIST;
}

export { getOpenAILikeModels, initializeModelList, PROVIDER_LIST };
