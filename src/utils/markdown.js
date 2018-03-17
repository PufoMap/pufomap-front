import { Parser, HtmlRenderer } from 'commonmark'

var reader = new Parser()
var writer = new HtmlRenderer({
  safe: true,
  smart: true
})

export function plainTextToMarkdown (plainText) {
  return writer.render(reader.parse(plainText))
}
