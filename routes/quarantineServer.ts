/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path from 'node:path'
import { type Request, type Response, type NextFunction } from 'express'

export function serveQuarantineFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file
    const baseDir = path.resolve('ftp/quarantine/')
    const targetPath = path.resolve(baseDir, file)

    if (targetPath.startsWith(baseDir)) {
      res.sendFile(targetPath)
    } else {
      res.status(403)
      next(new Error('Invalid file path!'))
    }
  }
}
