import type { NextFunction, Request, Response } from 'express';

/**
 * Handle async errors
 */
export function handleMethodError() {
  return function (_target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        console.log('Calling method:', methodName);
        await originalMethod.call(this, req, res, next);
      } catch (error) {
        // Handle errors here
        console.error('An error occurred:', { error: error.message, action: methodName });
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
    };

    return descriptor;
  };
}

type Constructor<T = object> = new (...args: any[]) => T;

export function handleAsyncErrors<T extends Constructor>(target: T) {
  const originalMethods = Object.getOwnPropertyNames(target);

  originalMethods.forEach((methodName) => {
    if (methodName !== 'constructor') {
      // Skip constructor
      const descriptor = Object.getOwnPropertyDescriptor(target, methodName);
      console.log('Method:', methodName);

      if (descriptor && typeof descriptor.value === 'function') {
        // Apply method decorator
        Object.defineProperty(target, methodName, handleMethodError()(target, methodName, descriptor));
      }
    }
  });

  return target;
}
