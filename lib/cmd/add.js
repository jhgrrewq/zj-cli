"use strict"

const co = require('co')
const prompt = require('co-prompt')
const fs = require('fs')

const table = require('../util/table')
const tip = require('../util/tip')
const tpls = require('../../templates')

module.exports = () => {
  co(function *() {
    // 分步接受用户输入参数
    const tplName = yield prompt('Template name：')
    const gitUrl = yield prompt('Git https link：')
    const branch = yield prompt('Git branch：')
    const description = yield prompt('Template description：')
    
    // 避免重复添加
    if (!tpls[tplName]) {
      tpls[tplName] = {}
      tpls[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤 unicode 字符
      tpls[tplName]['branch'] = branch
      tpls[tplName]['description'] = description
    } else {
      tip.fail('Template is already exist !')
      process.exit()
    }

    // 把模板信息写入 template.json 
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tpls), 'utf-8', err => {
      // 错误处理
      if (err) {
        console.log(err)
        tip.fail('Please rerun !')
        process.exit()
      }
    
      table(tpls)
      tip.suc('New template is added !')
      process.exit()
    })
  })
}