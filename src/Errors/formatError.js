import chalk from 'chalk'

export default function formatError(customMessage, error) {
  const redLine = chalk.red('='.repeat(50))
  const formattedMessage = chalk.red(customMessage)
  const stackTrace = chalk.gray(error.stack)

  console.log(redLine)
  console.log(formattedMessage)
  console.log(redLine)
  console.log('\n')
  console.log(stackTrace)
}
