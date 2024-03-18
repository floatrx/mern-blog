import type { NextFunction, Request, Response } from 'express';

/**
 * Handle async errors
 */
export function handleError() {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, _next: NextFunction) {
      try {
        await originalMethod.call(this, req, res);
      } catch (error) {
        // Handle errors here
        console.error('An error occurred:', { error: error.message, action: _propertyKey });
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
    };

    return descriptor;
  };
}
