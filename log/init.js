import * as F from './format.js'
import messages from './messages.js'

export function initializingProject() {
  F.formatInfo(messages.INITIALIZING_PROJECT())
}

export function askProjectName() {
  return messages.ASK_PROJECT_NAME()
}

export function repositoryExistsError() {
  F.formatError(messages.ERROR_REPOSITORY_EXISTS())
}