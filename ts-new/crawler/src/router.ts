import {Request, Response, Router, NextFunction} from "express";
import fs from 'fs';
import path from 'path'
import Crowller from "./utils/crowller";
import AnalyzerImpl from "./utils/analyzer";
import {getResponseData} from "./utils/util";

const router = Router()

interface RequestBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if (!isLogin) {
    res.json(getResponseData(null, '请先登录'))
    return false
  }
  next()
}

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
      <html>
        <body>
        <a href="/getData">爬取内容</a>
        <a href="/showData">展示内容</a>
        <a href="/logout">退出</a>
        </body>
      </html>
    `)
  } else {
    res.send(`
      <html>
        <body>
          <form action="/login" method="post">
            <input type="password" name="password">
            <button>登录</button>
          </form>
        </body>
      </html>
    `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

router.post('/login', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  const {password} = req.body
  if (isLogin) {
    res.json(getResponseData(false, '已经登录过'))
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(false, '密码错误'))
    }
  }
})

router.get('/getData', checkLogin, (req: RequestBody, res: Response) => {
  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const anylyzer = AnalyzerImpl.getInstance()
  new Crowller(anylyzer, url)
  res.json(getResponseData(true, '数据获取成功'))
})

router.get('/showData', checkLogin, (req: RequestBody, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const file = fs.readFileSync(position, 'utf-8')
    res.json(getResponseData(JSON.parse(file)))
  } catch (e) {
    res.json(getResponseData(false, '数据不存在'))
  }
})

router.get('/test', (req: Request, res: Response) => {
  res.send('this is test api from express.')
})

export default router
