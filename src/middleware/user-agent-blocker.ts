import { NextFunction, Request, Response } from 'express';

export function userAgentBlocker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userAgent = req.headers['user-agent'] ?? '';

  // List of bot keywords to block
  const blockedBots = ['curl', 'wget', 'bot', 'spider', 'scraper'];

  if (blockedBots.some((bot) => userAgent.toLowerCase().includes(bot))) {
    res.status(403).send('Access Denied');
  } else {
    next();
  }
}
