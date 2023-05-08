import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(`Incoming request [${req.method}] - [${req.originalUrl}] `,'Requesting');
    next();
  }
}
