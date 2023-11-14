import { isPlainObject } from 'is-plain-object'
import { Element, Text } from 'slate'

export function isText(value: any): value is Text {
  return isPlainObject(value) && 'text' in value && typeof value.text === 'string'
}
export function isElement(value: any): value is Element {
  return isPlainObject(value) && 'children' in value && Array.isArray(value.children)
}
