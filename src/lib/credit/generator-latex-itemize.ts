import { allCreditRoles, Contributors } from './credit'

export function toLatexItemize(contributors: Contributors): string {
  let result = '\\begin{itemize}\n'

  Object.values(contributors).forEach((person) => {
    let contributorLine = ''

    person.credits.forEach((creditKey) => {
      contributorLine += ', ' + allCreditRoles[creditKey].name
    })
    contributorLine = contributorLine.slice(2)

    result +=
      '\t\\item \\textit{' + person.name + ':} ' + contributorLine + '\n'
  })

  result += '\\end{itemize}'

  return result
}
