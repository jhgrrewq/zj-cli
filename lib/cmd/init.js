'use strict'

const exec = require('child_process').exec // require('shelljs/global') // 可以使用 shelljs/global 中的 exec
const ora = require('ora') // ora loading 模块 require('ora').start() require('ora').stop()
const { prompt } = require('inquirer')

const tip = require('../util/tip')
const tpls = require('../../templates')

// inquirer.prompt([/* question */]).then(answers => {})
const question = [
  {
    type: 'input',
    name: 'tplName', // name 属性用来存储终端输入的值
    message: 'Template name: ', // message 属性用来打印在终端
    validate(val) {
      if (tpls[val]) {
        return true
      } else if (val === '') {
        return 'Template name is require !'
      } else if (!tpls[val]) {
        return 'Template is not exist !'
      }
    }
  }, 
  {
    type: 'input',
    name: 'projectName', // name 属性用来存储终端输入的值
    message: 'Project name: ', // message 属性用来打印在终端
    validate(val) {
      if (val !== '') {
        return true
      } 
      return 'Project name is required !'
    }
  }
]

module.exports = () => {
  prompt(question).then(({ tplName, projectName }) => {
    const spinner = ora('Downloading template...')
    const url = tpls[tplName]['url']
    const branch = tpls[tplName]['branch']

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