import assert from 'node:assert/strict'
import test from 'node:test'

import generateOutput from '../src/credit/generator.js'

const contributors = [
  {
    name: 'Ada Lovelace',
    role: ['Conceptualization', 'Software'],
  },
  {
    name: 'Grace Hopper',
    role: ['Formal analysis'],
  },
]

test('generates plain text output', () => {
  assert.equal(
    generateOutput('plain', contributors),
    'Ada Lovelace: Conceptualization, Software;\nGrace Hopper: Formal analysis;\n'
  )
})

test('generates plain text output with degree placeholders', () => {
  assert.equal(
    generateOutput('plainWithDegree', contributors),
    'Ada Lovelace: Conceptualization (lead|equal|supporting), Software (lead|equal|supporting);\nGrace Hopper: Formal analysis (lead|equal|supporting);\n'
  )
})

test('generates LaTeX text output', () => {
  assert.equal(
    generateOutput('latexText', contributors),
    '\\textbf{Ada Lovelace:} Conceptualization, Software; \n\\textbf{Grace Hopper:} Formal analysis'
  )
})

test('generates LaTeX itemize output', () => {
  assert.equal(
    generateOutput('latexItemize', contributors),
    '\\begin{itemize}\n\t\\item \\emph{Ada Lovelace:} Conceptualization, Software\n\t\\item \\emph{Grace Hopper:} Formal analysis\n\\end{itemize}'
  )
})

test('returns an error for unknown output styles', () => {
  assert.equal(
    generateOutput('unknown', contributors),
    'Error: Unknown generator style'
  )
})
