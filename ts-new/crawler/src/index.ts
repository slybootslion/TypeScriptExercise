import express from 'express'
import bodyParser from "body-parser";
import cookieSession from 'cookie-session'
import router from "./router";

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieSession({
  name: 'session',
  keys: ['SlybootsLion'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(router)

app.listen(7001, () => {
  console.log('监听7001端口')
})
