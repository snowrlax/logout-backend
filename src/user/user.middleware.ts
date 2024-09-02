import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from './schema/user.schema';

interface CustomRequest extends Request {
  userId: string;
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    console.log('Middleware for User fired');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token!');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req.userId = decoded.userId;

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
