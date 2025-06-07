import { describe, it, expect, jest } from '@jest/globals'
import { logger } from '..'

jest.spyOn(global.console, 'log')

describe('@repo/logger', () => {
  it('prints a message', () => {
    logger.info('hello')
    expect(logger.info).toBeCalledWith('hello')
  })
})
