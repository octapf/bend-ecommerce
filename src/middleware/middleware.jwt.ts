import jwt, { JwtPayload } from 'jsonwebtoken'
import express from 'express'

export namespace JWTMiddleware {
	export const _sign = (userId: string): string => {
		const token = jwt.sign({ userId }, process.env.JWT_SECRET!)
		return token
	}

	export const _verify = (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const token = req.header('token')

		const verification = jwt.verify(token as string, process.env.JWT_SECRET!, {
			complete: true,
		}) as JwtPayload

		req.userId = verification.payload.userId

		next()
	}
}
