import * as F from './handler.js'
import messages from './messages.js'

export function initializingProject() {
  F.handleInfo(messages.INITIALIZING_PROJECT())
}

export function askProjectName() {
  return messages.ASK_PROJECT_NAME()
}

export function repositoryExistsError() {
  F.handleError(messages.ERROR_REPOSITORY_EXISTS())
}

export function projectNameRequired() {
  F.handleError(messages.ERROR_PROJECT_NAME_REQUIRED())
}

export function invalidProjectName() {
  F.handleError(messages.ERROR_INVALID_PROJECT_NAME())
}

export function directoryNotEmpty() {
  F.handleError(messages.ERROR_DIRECTORY_NOT_EMPTY())
}