#!C:\Program Files\nodejs\node.exe node
const fs = require('node:fs')
const path = require('node:path')
const { exec } = require('node:child_process')
const readline = require('node:readline')

let folderName

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What is the name of your project? ', name => {
  folderName = name
  rl.close()
})

rl.on('close', () => {
  const folderPath = `${process.cwd()}/${folderName}`

  const indexFile = 'index.js'
  const envFile = '.env'
  const commands = [
    'npm init -y',
    'npm install express',
    'npm install cors',
    'npm install dotenv',
    'npm install bcrypt',
    'npm install mongoose'
  ]
  const indexContents =
    'const express = require("express")\nconst dotenv = require("dotenv")\ndotenv.config()\nconst cors = require("cors")\n\n\nconst app = express()\napp.use(cors)\n\nconst port = process.env.PORT || 5500\n\napp.listen(port,()=>{console.log(`Server is listening on port: `, port)})'

  const envContents = 'PORT=5000'

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
    console.log(`Folder: ${folderPath} created successfully`)

    const routes = path.join(folderPath, 'routes')
    const controllers = path.join(folderPath, 'controllers')
    const middlewares = path.join(folderPath, 'middlewares')
    const models = path.join(folderPath, 'models')
    const config = path.join(folderPath, 'config')
    const index = path.join(folderPath, indexFile)
    fs.writeFileSync(index, indexContents)
    console.log('✅Index.js file created successfully!')
    const env = path.join(folderPath, envFile)
    fs.writeFileSync(env, envContents)
    console.log('✅.env file created successsfully')

    fs.mkdirSync(routes)
    console.log('✅Routes folder created successfully!')

    fs.mkdirSync(controllers)
    console.log('✅Controllers folder created successfully!')

    fs.mkdirSync(middlewares)
    console.log('✅Middlewares folder created successfully!')

    fs.mkdirSync(models)
    console.log('✅Models folder created successfully!')

    fs.mkdirSync(config)
    console.log('✅Config folder created successfully!')

    const runCommands = (folderPath, commands) => {
      process.chdir(folderPath)

      commands.forEach(command => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`❌Error executing '${command}': ${error.message}`)
            return
          }
          if (stderr) {
            console.log(stderr)
          } else {
            console.log(stdout)
          }
          console.log(`✅Command '${command}' executed successfully.`)
        })
      })
    }

    runCommands(folderPath, commands)
  } else {
    console.log(`Folder: ${folderPath} already exist`)
  }
})
