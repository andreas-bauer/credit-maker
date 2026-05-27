const degreeOfContribution = ' (lead|equal|supporting)'

export default function generateOutput(style, contributors) {
  switch (style) {
    case 'plain':
      return toPlainText(contributors)
    case 'plainWithDegree':
      return toPlainTextWithDegree(contributors)
    case 'latexText':
      return toLatexText(contributors)
    case 'latexItemize':
      return toLatexItemize(contributors)
    default:
      return 'Error: Unknown generator style'
  }
}

function toPlainText(contributors) {
  return doToPlainText(contributors, false)
}

function toPlainTextWithDegree(contributors) {
  return doToPlainText(contributors, true)
}

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

function toLatexText(contributors) {
  let result = []

  Object.values(contributors).forEach((contributor) => {
    let contributorCredits = []

    contributor.role.forEach((r) => {
      contributorCredits.push(r)
    })
    result.push(
      '\\textbf{' + contributor.name + ':} ' + contributorCredits.join(', ')
    )
  })

  return result.join('; \n')
}

function toLatexItemize(contributors) {
  let result = '\\begin{itemize}\n'

  Object.values(contributors).forEach((contributor) => {
    let contributorLine = ''

    contributor.role.forEach((r) => {
      contributorLine += ', ' + r
    })
    contributorLine = contributorLine.slice(2)

    result +=
      '\t\\item \\emph{' + contributor.name + ':} ' + contributorLine + '\n'
  })

  result += '\\end{itemize}'

  return result
}
