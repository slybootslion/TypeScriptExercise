import fs from "fs";
import cheerioAPI from "cheerio";
import {Analyzer} from './crowller'


interface Course {
  title: string,
  count: number
}

interface CourseResult {
  time: number,
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class DellAnalyzerImpl implements Analyzer {
  private static instance: DellAnalyzerImpl

  static getInstance() {
    if (!DellAnalyzerImpl.instance) {
      this.instance = new DellAnalyzerImpl()
    }
    return DellAnalyzerImpl.instance
  }

  private constructor() {
  }

  public analyze(html: string, filePath: string): string {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }

  private getCourseInfo(html: string) {
    const $ = cheerioAPI.load(html)
    const courseItems = $(".course-item")
    let courseInfos: Course[] = []
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = Number(descs.eq(1).text().split('：')[1])
      let course = {title, count}
      courseInfos.push(course)
    })
    return {
      time: new Date().getTime(),
      data: courseInfos
    }
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      let res = fs.readFileSync(filePath, 'utf-8')
      if (!res) res = '{}'
      fileContent = JSON.parse(res)
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }
}

export default DellAnalyzerImpl
