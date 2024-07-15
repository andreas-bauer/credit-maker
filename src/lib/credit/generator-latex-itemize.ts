import { allCreditRoles, Authors } from './credit'

export function toLatexItemize(authors: Authors): string {
  let result = '\\begin{itemize}\n'

  Object.values(authors).forEach((author) => {
    let authorLine = ''

    author.credits.forEach((creditKey) => {
      authorLine += ', ' + allCreditRoles[creditKey].name
    })
    authorLine = authorLine.slice(2)

    result += '\t\\item \\textit{' + author.name + ':} ' + authorLine + '\n'
  })

  result += '\\end{itemize}'

  return result
}
