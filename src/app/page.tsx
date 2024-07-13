'use client'
import { Radio, RadioGroup } from '@headlessui/react'
import { Authors, allCreditRoles, Credit, isCredit } from '../lib/credit/credit'
import { toSimpleLatex } from '../lib/credit/generator-latex'
import { CreditGenerator } from '../lib/credit/generator'
import { useEffect, useState } from 'react'
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
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_STYLE)
  const [authorsWithCredits, setAuthorsWithCredits] = useState<Authors>({})

  const numAuthorsIdx = maxAuthorsIdx.slice(0, numAuthors)

  useEffect(() => {
    const genFn: CreditGenerator = availableStyles[selectedStyle] || toPlainText
    setOutputText(genFn(authorsWithCredits))
  }, [authorsWithCredits, selectedStyle])

  const onFormAction = (formData: FormData) => {
    const authors: Authors = {}

    formData.forEach((v, k, _) => {
      const [authorId, attribute] = k.split('-')
      if (!authors[authorId]) {
        authors[authorId] = { name: '', credits: [] }
      }

      if (attribute === 'author') {
        authors[authorId].name = v.toString() || 'Author' + authorId
      } else if (isCredit(attribute)) {
        authors[authorId].credits.push(attribute as Credit)
      }
    })
    setAuthorsWithCredits(authors)
  }

  const onCopyHandler = () => {
    navigator.clipboard.writeText(outputText)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-12'>
      <div className='w-fullconst flex flex-row gap-4'>
        {/* Left side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
          <div className='flex-wggrap flex items-center justify-between px-4 py-5'>
            {/* Card header */}
            <label className='text-xl text-gray-dark'>Author information</label>
          </div>
          <div className='p-5'>
            {/* Content goes here */}
            <form id='author-form' className='space-y-4 ' action={onFormAction}>
              <fieldset aria-label='Choose the number of authors'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium leading-6 text-gray-dark'>
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
                      className='flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-dark ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none data-[checked]:bg-primary data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-primary-hover sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset'
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>

              <div>
                {numAuthorsIdx.map((num) => (
                  <div key={num} className='mt-2 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-light sm:text-sm'>
                      Author {num}
                    </span>
                    <input
                      id={num + '-author'}
                      name={num + '-author'}
                      type='text'
                      className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-dark ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
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
                      className='v-4 w-4 text-center text-gray-light'
                    >
                      {id}
                    </p>
                  ))}
                </div>
                <div className='space-y-3'>
                  {Object.entries(allCreditRoles).map(([key, role]) => (
                    <div key={key} className='relative flex items-start'>
                      <div className='flex h-6 items-center space-x-1'>
                        {numAuthorsIdx.map((authId) => (
                          <input
                            id={key + '-' + authId}
                            key={'ckb-a' + authId + '-' + key}
                            name={authId + '-' + key}
                            type='checkbox'
                            aria-describedby={`${key}-description`}
                            className='h-4 w-4 cursor-pointer items-center rounded border-gray-300 text-primary focus:ring-primary'
                          />
                        ))}
                      </div>

                      <div className='ml-3 text-sm leading-6'>
                        <label
                          htmlFor={`ckb-${role.name}`}
                          className='font-medium text-gray-dark'
                        >
                          {role.name}
                        </label>
                        <p id={`ckb-${role.name}`} className='text-gray-light'>
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
              className='relative inline-flex items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='-ml-0.5 h-5 w-5'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
                />
              </svg>
              Generate Text
            </button>

            <div>
              <select
                id='generator-style'
                name='generator style'
                onChange={(e) => setSelectedStyle(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                {Object.entries(availableStyles).map(([key, _]) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              onClick={onCopyHandler}
              className='inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='-ml-0.5 h-5 w-5'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
                />
              </svg>
              Copy
            </button>
          </div>
          <div className='px-4 py-5'>
            {/* Content goes here */}
            <pre className='text-wrap font-mono text-xl text-gray-dark'>
              {outputText}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
