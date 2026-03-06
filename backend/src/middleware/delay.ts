import { Request, Response, NextFunction } from 'express'

const DELAY_MS = parseInt(process.env.API_DELAY ?? '300', 10)

export function delay(_req: Request, _res: Response, next: NextFunction) {
  setTimeout(next, DELAY_MS)
}
