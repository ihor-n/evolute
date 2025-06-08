import { describe, it, expect, jest } from '@jest/globals'
import { logger } from '..'

describe('@repo/logger', () => {
  it('prints a message', () => {
    const infoSpy = jest.spyOn(logger, 'info')
    logger.info('test')
    expect(infoSpy).toHaveBeenCalledWith('test')
    infoSpy.mockRestore()
  })
})
