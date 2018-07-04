'use strict'

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

    // 删除对应模板
    if (tpls[tplName]) {
      delete tpls[tplName]
    } else {
      tip.fail('Template is not exist !')
      process.exit()
    }

    // 写入 template.json 
    fs.writeFile(__dirname + '/../../templates.json', JSON.stringify(tpls), 'utf-8', err => {
      if (err) {
        console.log(err)
        tip.fail('Please rerun !')
        process.exit()
      }

      tip.suc('Template is deleted successfully !')
    
      if (JSON.stringify(tpls) !== '{}') {
        table(tpls)
      } else {
        tip.info('No template is added')
      }
    
      process.exit()
    })
  })
}