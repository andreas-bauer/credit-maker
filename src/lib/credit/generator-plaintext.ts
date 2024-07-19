import { allCreditRoles, Contributors } from './credit'

const degreeOfContribution = ' (lead|equal|supporting)'

function doToPlainText(
  contributors: Contributors,
  withDegree: boolean
): string {
  let result = ''

  Object.values(contributors).forEach((person) => {
    let contributorLine = ''

    person.credits.forEach((creditKey) => {
      contributorLine += ', ' + allCreditRoles[creditKey].name
      if (withDegree) {
        contributorLine += degreeOfContribution
      }
    })
    contributorLine = contributorLine.slice(2)

    result += person.name + ': ' + contributorLine + ';\n'
  })

  return result
}

export function toPlainText(contributors: Contributors): string {
  return doToPlainText(contributors, false)
}

export function toPlainTextWithDegree(contributors: Contributors): string {
  return doToPlainText(contributors, true)
}
