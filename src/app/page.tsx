'use client'
import { Radio, RadioGroup } from '@headlessui/react'
import { allCreditRoles, Credit, isCredit } from '../lib/credit/credit'
import { toSimpleLatex } from '../lib/credit/generator-latex'
import { CreditGenerator } from '../lib/credit/generator'
import { useState } from 'react'
import { toPlainText } from '@/lib/credit/generator-plaintext'

const DEFAULT_STYLE = 'Plain Text'
const MAX_NUM_AUTHORS = 6
const maxAuthorsIdx = Array.from(
  { length: MAX_NUM_AUTHORS },
  (_, index) => index + 1
)

const availableStyles: { [key: string]: CreditGenerator } = {
  [DEFAULT_STYLE]: toPlainText,
  'LaTeX Simple': toSimpleLatex,
}

export default function Home() {
  const [numAuthors, setNumAuthors] = useState(1)
  const [latexText, setLatexText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_STYLE)

  const numAuthorsIdx = maxAuthorsIdx.slice(0, numAuthors)

  const onFormAction = (formData: FormData) => {
    const authorName: string =
      formData.get('author-name')?.toString() || 'Author1'

    const authorCredits: Credit[] = []
    formData.forEach((_v, k, _) => {
      if (isCredit(k)) {
        authorCredits.push(k as Credit)
      }
    })

    const genFn: CreditGenerator = availableStyles[selectedStyle] || toPlainText
    setLatexText(genFn(authorName, authorCredits))
  }

  const onCopyHandler = () => {
    console.log('TODO: imlement functionality')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-12'>
      <div className='w-fullconst flex flex-row gap-4'>
        {/* Left side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
          <div className='flex-wggrap flex items-center justify-between px-4 py-5'>
            {/* Card header */}
            <label className='text-xl'>Author information</label>
          </div>
          <div className='p-5'>
            {/* Content goes here */}
            <form id='author-form' className='space-y-4 ' action={onFormAction}>
              <fieldset aria-label='Choose a memory option'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium leading-6 text-gray-900'>
                    Number of authors
                  </div>
                </div>

                <RadioGroup
                  value={numAuthors}
                  onChange={setNumAuthors}
                  className='mt-2 grid grid-cols-3 gap-4 sm:grid-cols-6'
                >
                  {maxAuthorsIdx.map((option) => (
                    <Radio
                      key={'option-' + option}
                      value={option}
                      className='flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none data-[checked]:bg-indigo-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-indigo-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-500 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset'
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>

              <div>
                {numAuthorsIdx.map((num) => (
                  <div key={num} className='mt-2 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm'>
                      Author {num}
                    </span>
                    <input
                      id={'author-name-' + num}
                      name={'author-name-' + num}
                      type='text'
                      className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                ))}
              </div>

              <fieldset>
                <legend className='sr-only'>Credit roles</legend>
                <div className='flex items-start space-x-1'>
                  {numAuthorsIdx.map((id) => (
                    <p
                      key={'lbl-cbk-' + id}
                      className='v-4 w-4 text-center text-gray-500'
                    >
                      {id}
                    </p>
                  ))}
                </div>
                <div className='space-y-3'>
                  {Object.entries(allCreditRoles).map(([key, role]) => (
                    <div key={key} className='relative flex items-start'>
                      <div className='flex h-6 items-center space-x-1'>
                        {numAuthorsIdx.map((id) => (
                          <input
                            id={key + '-' + id}
                            key={'ckb-' + id}
                            name={'ckb-' + id}
                            type='checkbox'
                            aria-describedby={`${key}-description`}
                            className='h-4 w-4 cursor-pointer items-center rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        ))}
                      </div>

                      <div className='ml-3 text-sm leading-6'>
                        <label
                          htmlFor={`ckb-${role.name}`}
                          className='font-medium text-gray-900'
                        >
                          {role.name}
                        </label>
                        <p id={`ckb-${role.name}`} className='text-gray-500'>
                          {role.definition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
          <div className='flex flex-wrap items-center justify-between px-4 py-4'>
            {/* Card header */}
            <button
              type='submit'
              form='author-form'
              className='relative inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Generate Output
            </button>

            <div>
              <select
                id='generator-style'
                name='generator style'
                onChange={(e) => setSelectedStyle(e.target.value)}
                className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                {Object.entries(availableStyles).map(([key, _]) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              onClick={onCopyHandler}
              className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
            >
              Copy to Clipboard
            </button>
          </div>
          <div className='px-4 py-5'>
            {/* Content goes here */}
            <p className='font-mono text-xl'>{latexText}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
