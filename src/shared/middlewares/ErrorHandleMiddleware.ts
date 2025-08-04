import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        type: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
