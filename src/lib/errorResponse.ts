import { NextResponse } from "next/server";
import {ErrorOptions} from '../interface/errorInterface'


export function errorResponse({
  code,
  message,
  details,
  requestId,
  status,
}: ErrorOptions) {
  const httpStatus =
    status ??
    ({
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_ERROR: 500,
    }[code] ?? 500);

  return NextResponse.json(
    {
      error: { code, message, ...(details ? { details } : {}) },
      requestId,
    },
    { status: httpStatus }
  );
}
