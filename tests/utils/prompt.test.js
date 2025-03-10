
import { askQuestion } from '../../utils/prompt.js'

import assert from 'node:assert/strict'
import test from 'node:test'
import readline from 'readline'

// Teste para askQuestion
test('askQuestion should return the user input', async () => {
  const mockInput = 'Test input'

  // Criando um mock para readline.createInterface
  const mockReadline = {
    question: (_, callback) => callback(mockInput),
    close: () => {}
  }

  // Substituindo readline.createInterface temporariamente
  const originalCreateInterface = readline.createInterface
  // @ts-ignore
  readline.createInterface = () => mockReadline

  try {
    const result = await askQuestion('What is your input? ')
    assert.strictEqual(result, mockInput)
  } finally {
    // Restaurando a função original após o teste
    readline.createInterface = originalCreateInterface
  }
})