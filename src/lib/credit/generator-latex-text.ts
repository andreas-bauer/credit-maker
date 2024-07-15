import { allCreditRoles, Authors } from './credit'

export function toLatexText(authors: Authors): string {
  let creditStatement: string[] = []

  Object.values(authors).forEach((author) => {
    let authorCredits: string[] = []
    author.credits.forEach((creditKey) => {
      authorCredits.push(allCreditRoles[creditKey].name)
    })
    creditStatement.push('\\textbf{' + author.name + ':} ' + authorCredits.join(', '))
  })

  return creditStatement.join('; ')
}
