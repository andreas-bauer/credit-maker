const degreeOfContribution = ' (lead|equal|supporting)'

function doToPlainText(contributors, withDegree) {
  let result = ''

  Object.values(contributors).forEach((contributor) => {
    let contributorLine = ''
    contributor.role.forEach((r) => {
      contributorLine += ', ' + r
      if (withDegree) {
        contributorLine += degreeOfContribution
      }
    })

    contributorLine = contributorLine.slice(2)

    result += contributor.name + ': ' + contributorLine + ';\n'
  })

  return result
}

function toPlainText(contributors) {
  return doToPlainText(contributors, false)
}

function toPlainTextWithDegree(contributors) {
  return doToPlainText(contributors, true)
}
