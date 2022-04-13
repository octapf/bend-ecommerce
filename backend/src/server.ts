import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/routes.user'

export const createServer = (): express.Application => {
	const app = express()

	app.use(express.json())
	app.use(morgan('dev'))
	app.use('/api/', userRoutes)

	app.set('port', 5000)

	return app
}
