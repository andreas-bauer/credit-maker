'use client'
import { Radio, RadioGroup } from '@headlessui/react'
import { Authors, allCreditRoles, Credit, isCredit } from '../lib/credit/credit'
import { toSimpleLatex } from '../lib/credit/generator-latex'
import { CreditGenerator } from '../lib/credit/generator'
import { useEffect, useState } from 'react'
import { toPlainText } from '@/lib/credit/generator-plaintext'
import { CheckIcon, ClipboardIcon, PlayIcon } from '@heroicons/react/24/outline'

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
  const [showSuccessCopy, setShowSuccessCopy] = useState<boolean>(false)

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

    setShowSuccessCopy(true)
    setTimeout(() => {
      setShowSuccessCopy(false)
    }, 2000)
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
              <PlayIcon className='-ml-0.5 h-5 w-5' />
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
              className='inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100'
            >
              <CheckIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? '' : 'hidden'}`}
              />
              <ClipboardIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? 'hidden' : ''}`}
              />
              {showSuccessCopy ? 'Copied!' : 'Copy'}
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
