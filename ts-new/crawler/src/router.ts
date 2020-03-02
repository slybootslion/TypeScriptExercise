import {Request, Response, Router} from "express";
import DellAnalyzerImpl from "./dellAnalyzer";
import Crowller from "./crowller";

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('hello express!')
})

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const anylyzer = DellAnalyzerImpl.getInstance()
  new Crowller(anylyzer, url)
  res.send('get data success!')
})

router.get('/test', (req: Request, res: Response) => {
  res.send('this is test api from express.')
})

export default router
