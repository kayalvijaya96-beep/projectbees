import { NextResponse } from 'next/server';

export interface ApiMeta {
  request_id: string;
  timestamp: string;
}

export interface ApiSuccessEnvelope<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: ApiMeta;
}

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

export function successResponse<T>(data: T, status = 200): NextResponse<ApiSuccessEnvelope<T>> {
  return NextResponse.json(
    {
      data,
      meta: {
        request_id: generateRequestId(),
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
): NextResponse<ApiErrorEnvelope> {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
      meta: {
        request_id: generateRequestId(),
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}

