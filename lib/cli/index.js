const chalk = require('chalk')
const semver = require('semver')
const program = require('commander')
const pkg = require('../../package.json')

// check nodejs version
if (!semver.satisfies(process.version, pkg.engines.node)) {
  console.log(chalk.red.bold(`Require Node.js version ${pkg.engines.node}, current ${process.version}`))
  console.log(`Download latest Node.js version here ${chalk.green('https://nodejs.org/en/download/')}`)
  process.exit()
}

// commander 方法设置命令的名称
// discription 方法设置描述
// alias 方法设置简写
// action 方法设置回调
// parse 方法解析，一般用来解析参数

program
  .version(pkg.version)

program
  .command('init') // zj init
  .description('生成一个项目')
  .alias('i') // 简写
  .action(() => {
    require('../cmd/init')()
  })

program
  .command('add') // zj add
  .description('添加新模板')
  .alias('a') // 简写
  .action(() => {
    require('../cmd/add')()
  })

program
  .command('list') // zj list
  .description('查看模板列表')
  .alias('l')
  .action(() => {
    require('../cmd/list')()
  })

program
  .command('delete') // zj delete
  .description('删除模板') 
  .alias('d') // 简写
  .action(() => {
    require('../cmd/delete')()
  })

program.parse(process.argv)

// 如果没有参数，运行帮助方法
// if (!program.args.length) {
//   program.help()
// }
if (!process.argv.slice(2).length) {
  program.help()
}