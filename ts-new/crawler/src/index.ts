import express from 'express'
import router from "./router";

const app = express()
app.use(router)

app.listen(7001, () => {
  console.log('监听7001端口')
})
