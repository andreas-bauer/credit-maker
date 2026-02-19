import { allCreditRoles, Contributors } from './credit'

export function toLatexText(contributors: Contributors): string {
  let creditStatement: string[] = []

  Object.values(contributors).forEach((person) => {
    let contributorCredits: string[] = []
    person.credits.forEach((creditKey) => {
      contributorCredits.push(allCreditRoles[creditKey].name)
    })
    creditStatement.push(
      '\\textbf{' + person.name + ':} ' + contributorCredits.join(', ')
    )
  })

  return creditStatement.join('; ')
}
