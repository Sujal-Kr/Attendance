import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOption } from './constants/config.js';
import { authRouter } from './router/auth.router.js';
import { handleApiError } from './utils/error.js';
import { userRouter } from './router/user.router.js';
import { dbConnect } from './utils/connection.js';
import { Server } from 'socket.io';
import { createServer } from 'http'
import { socketAuthentication } from './middleware/auth.js';
import { adminRouter } from './router/admin.router.js';


const app = express();
const server =createServer(app)
const io=new Server(server,{
    cors:corsOption
})

app.set('io',io)

const port = process.env.PORT || 4000

dbConnect()

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOption))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin',adminRouter)


export const userSocketIds = new Map()
io.use(socketAuthentication)
io.on('connection',(socket)=>{
    const user=socket.user
    userSocketIds.set(user._id.toString(), socket.id)
    console.log(userSocketIds)
    
    socket.on('disconnect', () => {
        userSocketIds.delete(user._id.toString())
        console.log('user disconnected')
    })
})

app.use(handleApiError)

server.listen(port, () => {
    console.log(`server is running on ${port}...`)
})
