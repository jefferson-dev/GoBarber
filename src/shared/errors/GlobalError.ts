import { Request, Response, NextFunction } from 'express';

import AppError from './AppError';

export default function GlobalError(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Error Server.',
  });
}
