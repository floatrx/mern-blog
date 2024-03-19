import type { NextFunction, Request, Response } from 'express';

/**
 * Handle async errors
 */
export function handleMethodError() {
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

type Constructor<T = object> = new (...args: any[]) => T;

export function handleAsyncErrors<T extends Constructor>(target: T) {
  const originalMethods = Object.getOwnPropertyNames(target.prototype);

  originalMethods.forEach((methodName) => {
    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);

    if (descriptor && typeof descriptor.value === 'function') {
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          console.error('An error occurred:', error);
          // You can handle the error here, for example, sending a response
          throw new Error('Internal Server Error');
        }
      };

      Object.defineProperty(target.prototype, methodName, descriptor);
    }
  });

  return target;
}
