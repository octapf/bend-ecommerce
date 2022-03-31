import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './core/core.db'
import { createServer } from './server'

dotenv.config()
connectDB()

const app = createServer()

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`)
})
