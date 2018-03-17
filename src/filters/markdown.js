import { plainTextToMarkdown } from '@/utils/markdown'

export function markdown (text) {
  return text
    ? plainTextToMarkdown(text)
    : ''
}
