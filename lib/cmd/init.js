'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const ora = require('ora')
// ora loading 模块 require('ora').start() require('ora').stop()

const tip = require('../util/tip')
const tpls = require('../../templates')

module.exports = () => {
  co(function *() {
    // 处理用户输入
    const tplName = yield prompt('Template name： ')
    const projectName = yield prompt('Project name：')
    if (!tpls[tplName]) {
      tip.fail('Template is not exist !')
      process.exit()
    }

    const spinner = ora('Downloading template...')
    const { url, branch } = { ...tpls[tplName] }

    // git 命令，远程拉去项目并自定义项目名
    const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`

    spinner.start()

    exec(cmdStr, err => {
      if (err) {
        console.log(err)
        tip.fail('Please rerun !')
        process.exit()
      }
    
      // 删除 git 文件  
      exec(`cd ${projectName} && rm -rf .git`, (err, out) => {
        spinner.stop()

        if (err) {
          console.log(err)
          tip.failt('Please rerun！')
          process.exit()
        }

        tip.suc('Init successfully !')

        tip.info(`cd ${projectName} && npm install`)

        process.exit()
      })
    })
  })
}