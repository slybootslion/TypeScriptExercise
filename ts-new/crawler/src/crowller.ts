import fs from "fs";
import path from "path";
import superagent from "superagent";
import DellAnalyzerImpl from "./dellAnalyzer";


interface Analyzer {
  analyze: (html: string, filePath: string) => string
}

export {Analyzer}


class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  constructor(private anylyzer: Analyzer, private url: string) {
    this.initSpiderProcess()
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent: string = this.anylyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url.trim())
    return result.text
  }

  private writeFile(str: string) {
    fs.writeFileSync(this.filePath, str)
  }
}
export default Crowller


