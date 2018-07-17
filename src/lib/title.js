import config from '../config'
import { flattenDeep, isObject } from 'lodash'

export default function title (parts) {
  const _parts = flattenDeep([parts])
  _parts.reverse()
  return _parts
    .map(part => {
      if (isObject(part)) {
        if (part.text) return part.text
        return
      }
      return part
    })
    .concat([config.site])
    .filter(part => part !== undefined && part !== null)
    .join(' / ')
}
