import { Request, Response, NextFunction } from 'express';

/**
 * Bearer token authentication middleware.
 * Validates the `Authorization: Bearer <token>` header against the `API_SECRET` env var.
 * 
 * If API_SECRET is not set, auth is disabled (local dev mode).
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const apiSecret = process.env.API_SECRET;

  // If no API_SECRET is configured, skip auth (local dev mode)
  if (!apiSecret) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      error: 'Missing Authorization header. Use: Authorization: Bearer <API_SECRET>',
    });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({
      success: false,
      error: 'Invalid Authorization header format. Use: Authorization: Bearer <API_SECRET>',
    });
    return;
  }

  const token = parts[1];
  if (token !== apiSecret) {
    res.status(403).json({
      success: false,
      error: 'Invalid API secret token.',
    });
    return;
  }

  next();
}
