import { NextResponse } from 'next/server';

export interface ApiMeta {
  request_id: string;
  timestamp: string;
}

export function generateRequestId(): string {
  return `req_adm_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

export function successResponse<T>(data: T, status = 200) {
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

export function errorResponse(code: string, message: string, status = 400, details?: unknown) {
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

