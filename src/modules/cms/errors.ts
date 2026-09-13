export class CmsError extends Error {
  readonly status: number;
  readonly code: 'network' | 'http' | 'invalid' | 'config';

  constructor(
    message: string,
    options?: { status?: number; code?: CmsError['code']; cause?: unknown }
  ) {
    super(message, options?.cause ? { cause: options.cause } : undefined);
    this.name = 'CmsError';
    this.status = options?.status ?? 500;
    this.code = options?.code ?? 'http';
  }
}

export function isCmsError(error: unknown): error is CmsError {
  return error instanceof CmsError;
}

export function toErrorMessage(error: unknown, fallback = '加载失败') {
  if (isCmsError(error) || error instanceof Error) return error.message || fallback;
  return fallback;
}
