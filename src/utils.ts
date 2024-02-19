import { NextFunction, Request, Response } from 'express';

/**
 * Error handler
 * @returns status 500 if internal server error with JSON
 *  { message: 'Internal Server Error' }
 */
export const serverErrorHandler = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'Internal Server Error' });
};

export const syntaxErrorHandler = (err: any, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  next();
};

// Handle errors in a consistent way
export const handleError = (msg: string): void => {
  throw new Error(msg);
};
