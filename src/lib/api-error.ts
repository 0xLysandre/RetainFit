export class ApiError extends Error {
  public statusCode: number;
  public code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'ApiError';
  }

  static badRequest(message: string, code?: string) {
    return new ApiError(message, 400, code);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new ApiError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message: string = 'Forbidden') {
    return new ApiError(message, 403, 'FORBIDDEN');
  }

  static notFound(message: string = 'Not found') {
    return new ApiError(message, 404, 'NOT_FOUND');
  }

  static internal(message: string = 'Internal server error') {
    return new ApiError(message, 500, 'INTERNAL_ERROR');
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return Response.json(error.toJSON(), { 
      status: error.statusCode 
    });
  }

  if (error instanceof Error) {
    return Response.json(
      { error: error.message, code: 'UNKNOWN_ERROR' },
      { status: 500 }
    );
  }

  return Response.json(
    { error: 'Internal server error', code: 'UNKNOWN_ERROR' },
    { status: 500 }
  );
}