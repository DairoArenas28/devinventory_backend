import express from 'express'
import cors  from 'cors'
import router from './router'
import { corsConfig } from './config/cors'

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

app.use('/', router)

export default app