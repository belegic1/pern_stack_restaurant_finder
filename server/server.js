import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import db from './db/index.js'
import restaurantRouter from './routes/restaurants.js'

const app = express()
dotenv.config()



app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/restaurants', restaurantRouter)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('Listening')
})