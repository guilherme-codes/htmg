import chalk from 'chalk'

export function formatError(customMessage, error) {
  let formattedMessage = chalk.red(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `❌ ${formattedMessage}`
  }

  console.log(formattedMessage)


  console.log(chalk.gray(error.stack))
}

export function formatSuccess(customMessage) {
  let formattedMessage = chalk.green(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `✅ ${formattedMessage}`
  }

  console.log(formattedMessage)
  console.log('\n')
}

export function formatInfo(customMessage) {
  let formattedMessage = chalk.whiteBright(customMessage)

  if (process.stdout.isTTY) {
    formattedMessage = `🔄   ${formattedMessage}`
  }

  console.log(formattedMessage)
}