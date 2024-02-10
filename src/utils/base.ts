import isPlainObject from 'lodash-es/isPlainObject'

export const isObject = (value: unknown): value is Record<string, unknown> =>
  isPlainObject(value)
