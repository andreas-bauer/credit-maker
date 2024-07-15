import { allCreditRoles, Contributors } from './credit'

export function toPlainText(contributors: Contributors): string {
  let result = ''

  Object.values(contributors).forEach((person) => {
    let contributorLine = ''

    person.credits.forEach((creditKey) => {
      contributorLine += ', ' + allCreditRoles[creditKey].name
    })
    contributorLine = contributorLine.slice(2)

    result += person.name + ': ' + contributorLine + ';\n'
  })

  return result
}
