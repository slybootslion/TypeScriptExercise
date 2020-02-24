const superagent = require('superagent');
const cheerioAPI = require('cheerio')
const fs = require('fs');
const path = require('path')

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

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private filePath = ''

  constructor() {
    this.initSpiderProcess()
  }

  private async initSpiderProcess() {
    const text = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(text)
    const fileContent = this.generateJsonContent(courseInfo)
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent))

  }

  private async getRawHtml() {
    const result = await superagent.get(this.url.trim())
    return result.text
  }

  private generateJsonContent(courseInfo: CourseResult) {
    this.filePath = path.resolve(__dirname, '../data/course.json')
    let fileContent: Content = {}
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
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
}

const crowller = new Crowller()
