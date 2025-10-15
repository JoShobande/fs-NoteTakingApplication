export interface ErrorOptions {
    code:
      | "BAD_REQUEST"
      | "UNAUTHORIZED"
      | "FORBIDDEN"
      | "NOT_FOUND"
      | "CONFLICT"
      | "INTERNAL_ERROR";
    message: string;
    details?: any;
    requestId: string;
    status?: number;
  }