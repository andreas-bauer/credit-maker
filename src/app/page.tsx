'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import { Radio, RadioGroup } from '@headlessui/react'
import {
  Contributors,
  allCreditRoles,
  Credit,
  isCredit,
} from '@/lib/credit/credit'
import { CreditGenerator } from '@/lib/credit/generator'
import { toLatexText } from '@/lib/credit/generator-latex-text'
import { toLatexItemize } from '@/lib/credit/generator-latex-itemize'
import {
  toPlainText,
  toPlainTextWithDegree,
} from '@/lib/credit/generator-plaintext'
import { SecondaryButton } from '@/components/SecondaryButton'

const DEFAULT_STYLE = 'Plain text'
const MAX_NUM_CONTRIBUTORS = 6
const maxContributorIdx = Array.from(
  { length: MAX_NUM_CONTRIBUTORS },
  (_, index) => index + 1
)

const availableStyles: { [key: string]: CreditGenerator } = {
  [DEFAULT_STYLE]: toPlainText,
  'Plain text with degree options': toPlainTextWithDegree,
  'LaTeX itemize': toLatexItemize,
  'LaTeX text': toLatexText,
}

function formAsContributor(formData: FormData): Contributors {
  const contributors: Contributors = {}

  formData.forEach((v, k, _) => {
    const [contributorId, attribute] = k.split('-')
    if (!contributors[contributorId]) {
      contributors[contributorId] = { name: '', credits: [] }
    }

    if (attribute === 'contributor') {
      contributors[contributorId].name =
        v.toString() || 'Contributor' + contributorId
    } else if (isCredit(attribute)) {
      contributors[contributorId].credits.push(attribute as Credit)
    }
  })

  return contributors
}

export default function Home() {
  const contributorFormRef = useRef<HTMLFormElement | null>(null)
  const [numContributors, setNumContributors] = useState(1)
  const [outputText, setOutputText] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(DEFAULT_STYLE)
  const [showSuccessCopy, setShowSuccessCopy] = useState<boolean>(false)

  const numContributorsIdx = maxContributorIdx.slice(0, numContributors)

  function getContributorsWithCredits(): Contributors {
    if (contributorFormRef.current === null) {
      contributorFormRef.current = new HTMLFormElement()
    }
    const formData = new FormData(contributorFormRef.current)
    return formAsContributor(formData)
  }

  const onChange = useCallback(() => {
    const contributorsWithCredits = getContributorsWithCredits()
    const genFn: CreditGenerator = availableStyles[selectedStyle] || toPlainText
    setOutputText(genFn(contributorsWithCredits))
  }, [selectedStyle])

  useEffect(() => {
    onChange()
  }, [numContributors, selectedStyle, onChange])

  const onCopyHandler = () => {
    navigator.clipboard.writeText(outputText)

    setShowSuccessCopy(true)
    setTimeout(() => {
      setShowSuccessCopy(false)
    }, 2000)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-white p-4'>
      <div className='w-fullconst z-10 flex flex-row gap-4'>
        {/* Left side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-md bg-white/70 shadow-sm'>
          <div className='flex-wggrap flex items-center justify-between px-4 py-5'>
            {/* Card header */}
            <label className='text-gray-dark text-xl'>
              Contributor information
            </label>
          </div>
          <div className='p-5'>
            {/* Content goes here */}
            <form
              id='contributor-form'
              ref={contributorFormRef}
              className='space-y-4'
              onChange={onChange}
            >
              <fieldset aria-label='Choose the number of contributors'>
                <div className='flex items-center justify-between'>
                  <div className='text-gray-dark text-sm leading-6 font-medium'>
                    Number of contributors
                  </div>
                </div>

                <RadioGroup
                  value={numContributors}
                  onChange={setNumContributors}
                  className='mt-2 grid grid-cols-3 gap-4 sm:grid-cols-6'
                >
                  {maxContributorIdx.map((option) => (
                    <Radio
                      key={'option-' + option}
                      value={option}
                      className='text-gray-dark data-checked:bg-primary data-focus:ring-primary data-checked:hover:bg-primary-hover flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-hidden data-checked:text-white data-checked:ring-0 data-focus:ring-2 data-focus:ring-offset-2 data-focus:data-checked:ring-2 sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset'
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>

              <div>
                <div className='flex items-center justify-between'>
                  <div className='text-gray-dark text-sm leading-6 font-medium'>
                    Contributor names
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                  {numContributorsIdx.map((num) => (
                    <div key={num} className='mt-2 flex rounded-md shadow-xs'>
                      <span className='text-gray-light inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 sm:text-sm'>
                        {num}
                      </span>
                      <input
                        id={num + '-contributor'}
                        name={num + '-contributor'}
                        type='text'
                        className='text-gray-dark focus:ring-primary block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 px-3 py-1.5 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
                      />
                    </div>
                  ))}
                </div>
              </div>

              <fieldset>
                <legend className='sr-only'>Credit roles</legend>
                <div className='flex items-start space-x-2'>
                  {numContributorsIdx.map((id) => (
                    <p
                      key={'lbl-cbk-' + id}
                      className='v-4 text-gray-light w-4 text-center'
                    >
                      {id}
                    </p>
                  ))}
                </div>
                <div className='space-y-3'>
                  {Object.entries(allCreditRoles).map(([key, role]) => (
                    <div key={key} className='relative flex items-start'>
                      <div className='flex h-6 items-center space-x-2'>
                        {numContributorsIdx.map((authId) => (
                          <input
                            id={key + '-' + authId}
                            key={'ckb-a' + authId + '-' + key}
                            name={authId + '-' + key}
                            type='checkbox'
                            aria-describedby={`${key}-description`}
                            className='text-primary focus:ring-primary h-4 w-4 cursor-pointer items-center rounded-sm border-gray-300'
                          />
                        ))}
                      </div>

                      <div className='ml-3 text-sm leading-6'>
                        <label
                          htmlFor={`ckb-${role.name}`}
                          className='text-gray-dark font-medium'
                        >
                          {role.name}
                        </label>
                        <p
                          id={`ckb-${role.name}`}
                          className='text-gray-light text-wrap'
                        >
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
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-md bg-white/70 shadow-sm'>
          <div className='flex flex-wrap items-center justify-between gap-4 p-4'>
            {/* Card header */}
            <select
              id='generator-style'
              name='generator style'
              tabIndex={21}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className='text-gray-dark w-full rounded-md border-0 py-1.5 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 lg:w-44 lg:grow'
            >
              {Object.entries(availableStyles).map(([key, _]) => (
                <option key={key}>{key}</option>
              ))}
            </select>

            <SecondaryButton
              type='submit'
              className='w-full lg:w-24'
              tabIndex={22}
              onClick={onCopyHandler}
            >
              <CheckIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? '' : 'hidden'}`}
              />
              <ClipboardIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? 'hidden' : ''}`}
              />
              <span className=''>{showSuccessCopy ? 'Copied!' : 'Copy'}</span>
            </SecondaryButton>
          </div>
          <div className='px-4 py-5'>
            {/* Content goes here */}
            <pre className='text-gray-dark font-mono text-xl text-wrap'>
              {outputText}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
