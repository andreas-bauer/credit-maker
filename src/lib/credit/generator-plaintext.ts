import { allCreditRoles, Credit } from './credit'

export function toPlainText(authorName: string, credits: Credit[]): string {
  let allAuthorCredits = ''
  credits.forEach((creditKey) => {
    allAuthorCredits += ', ' + allCreditRoles[creditKey].name
  })
  allAuthorCredits = allAuthorCredits.slice(2)

  return authorName + ': ' + allAuthorCredits
}
