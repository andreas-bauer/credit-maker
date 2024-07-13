import { allCreditRoles, Authors } from './credit'

export function toPlainText(authors: Authors): string {
  let result = ''

  Object.values(authors).forEach((author) => {
    let authorLine = ''

    author.credits.forEach((creditKey) => {
      authorLine += ', ' + allCreditRoles[creditKey].name
    })
    authorLine = authorLine.slice(2)

    result += author.name + ': ' + authorLine + ';\n'
  })

  return result
}
