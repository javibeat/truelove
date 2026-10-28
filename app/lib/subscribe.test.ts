import { describe, expect, it } from 'vitest'
import { parseSubscribeInput } from './subscribe'

describe('parseSubscribeInput', () => {
  it('accepts a normal email and trims it', () => {
    expect(parseSubscribeInput({ email: '  ana@example.com ' })).toEqual({
      kind: 'valid',
      email: 'ana@example.com',
    })
  })

  it('rejects missing, empty and non-string emails', () => {
    expect(parseSubscribeInput({})).toEqual({ kind: 'invalid' })
    expect(parseSubscribeInput({ email: '' })).toEqual({ kind: 'invalid' })
    expect(parseSubscribeInput({ email: ['@'] })).toEqual({ kind: 'invalid' })
    expect(parseSubscribeInput({ email: 42 })).toEqual({ kind: 'invalid' })
  })

  it('rejects malformed emails', () => {
    for (const email of ['@', 'ana@', '@example.com', 'ana@example', 'a na@example.com']) {
      expect(parseSubscribeInput({ email })).toEqual({ kind: 'invalid' })
    }
  })

  it('rejects emails longer than 254 characters', () => {
    const email = `${'a'.repeat(250)}@example.com`
    expect(parseSubscribeInput({ email })).toEqual({ kind: 'invalid' })
  })

  it('rejects bodies that are not objects', () => {
    expect(parseSubscribeInput(null)).toEqual({ kind: 'invalid' })
    expect(parseSubscribeInput('ana@example.com')).toEqual({ kind: 'invalid' })
  })

  it('flags bots that fill the hidden field', () => {
    expect(parseSubscribeInput({ email: 'ana@example.com', website: 'spam.biz' })).toEqual({
      kind: 'bot',
    })
  })

  it('ignores an empty hidden field', () => {
    expect(parseSubscribeInput({ email: 'ana@example.com', website: '' })).toEqual({
      kind: 'valid',
      email: 'ana@example.com',
    })
  })
})
