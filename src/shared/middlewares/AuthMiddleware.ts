import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("JWT token is missing", 401);

    const [, token] = authHeader.split(" ");

    try {
      const decoded = verify(token, process.env.APP_SECRET as Secret);

      const { sub } = decoded as ITokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      throw new AppError("Invalid JWT token", 401);
    }
  }
}
