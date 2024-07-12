import { allCreditRoles, Authors } from './credit'

export function toSimpleLatex(authors: Authors): string {
  let result = ''

  Object.values(authors).forEach((author) => {
    let authorLine = ''

    author.credits.forEach((creditKey) => {
      authorLine += ', ' + allCreditRoles[creditKey].name
    })
    authorLine = authorLine.slice(2)

    result += '\\textit{' + author.name + ':} ' + authorLine
  })

  return result
}
