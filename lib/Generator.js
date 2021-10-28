/** @format */

const ora = require('ora')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const util = require('util')
const fs = require('fs-extra')

// 添加加载动画
async function recursionCopy(templateUrl, cwdUrl) {
  // 试用ora 初始化，传入提示信息 message
  const spinner = ora('正在创建模版')
  // 开始加载动画
  spinner.start()
  try {
    fs.ensureDir(cwdUrl, (err) => {
      if (err) return console.error(err)
      fs.copy(templateUrl, cwdUrl, (err) => {
        if (err) return console.error(err)
        console.log('复制成功')
      })
    })

    // 状态为修改成功
    spinner.succeed()
  } catch (error) {
    // 状态为修改失败
    spinner.fail('Request failed , refetch ...')
  }
}

class Genrator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name
    //创建位置
    this.targetDir = targetDir
  }

  // 获取用户选择的模版
  // 1）从远程拉取模版数据
  // 2）用户选择模版名称
  // 3）return 用户选择的名称

  async getRepo() {
    const repos = ['react-crx', 'electron-react-ts-scss', 'vue2-ts-vuexClass']
    // 1) 用户选择模版名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project',
    })

    // 2) return 用户选择的名称
    return repo
  }

  // 1) 复制本地模版到当前命令目录
  async copy(repo) {
    // 模版文件目录
    const templateUrl = path.join(__dirname, `../templates/${repo}`)
    const targetUrl = path.join(process.cwd(), this.name)

    // 2) 递归复制
    fs.ensureDir(targetUrl, (err) => {
      if (err) return console.error(err)
      fs.copy(templateUrl, targetUrl, (err) => {
        if (err) return console.error(err)
        console.log('复制成功')
      })
    })
  }

  // 核心创建逻辑
  // 1) 获取模版名称
  // 2）复制模版到模版目录

  async create() {
    // 1) 获取模版名称
    const repo = await this.getRepo()

    // 2）复制模版到模版目录
    await this.copy(repo)

    // 3） 模版试用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
  }
}
module.exports = Genrator
