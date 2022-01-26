#! /usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import figlet from 'figlet'
import create from '../core/create'

program
  .command('create <app-name>')
  .description('create a new projcet')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exitst')
  .action((name, options) => {
    // 在create.js 中执行创建任务
    create(name, options)
  })

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 help 命令
program.on('--help', () => {
  // 使用 figlet 绘制 Logo
  console.log(
    '\r\n' +
      figlet.textSync('ckf-cli', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 180,
        whitespaceBreak: true,
      })
  )
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
})

//  配置ui命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((options) => {
    console.log(options)
  })

program
  .version(`v${require('../../package.json').version}`)
  .usage('<command [option]')

// 解析用户执行命令传入参数
program.parse(process.argv)
