const Table = require('cli-table')

const tip = require('./tip')

const table = new Table({
  head: ['name', 'description'],
  style: {
    head: ['green']
  }
})

module.exports = (tplList) => {
  const keys = Object.keys(tplList)

  if(keys.length) {
    keys.forEach((key) => {
      table.push(
        [key, tplList[key].description]
      )
    })
    const list = table.toString()
    if (list) {
      tip.info('Template list are: ')
      console.log(`${list}\n`)
    } else {
      tip.fail('Template is not exist !')
    }
  } else {
    tip.fail('Template is not exist !')
    process.exit()
  }
}
