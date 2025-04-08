import server from './server'
import { connectDB } from './config/db'
import 'dotenv/config'
const port = 4000

connectDB()

server.listen(port, () => {
    console.log('Servidor escuchando en el puerto' + port)
})