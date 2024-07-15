'use client'
import { useEffect, useRef, useState } from 'react'
import { CheckIcon, ClipboardIcon, PlayIcon } from '@heroicons/react/24/outline'
import { Radio, RadioGroup } from '@headlessui/react'
import { PrimaryButton } from '@/components/PrimaryButton'
import {
  Contributors,
  allCreditRoles,
  Credit,
  isCredit,
} from '@/lib/credit/credit'
import { CreditGenerator } from '@/lib/credit/generator'
import { toLatexText } from '@/lib/credit/generator-latex-text'
import { toLatexItemize } from '@/lib/credit/generator-latex-itemize'
import { toPlainText } from '@/lib/credit/generator-plaintext'
import { SecondaryButton } from '@/components/SecondaryButton'

const DEFAULT_STYLE = 'Plain Text'
const MAX_NUM_CONTRIBUTORS = 6
const maxContributorIdx = Array.from(
  { length: MAX_NUM_CONTRIBUTORS },
  (_, index) => index + 1
)

const availableStyles: { [key: string]: CreditGenerator } = {
  [DEFAULT_STYLE]: toPlainText,
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

  useEffect(() => {
    const contributorsWithCredits = getContributorsWithCredits()
    const genFn: CreditGenerator = availableStyles[selectedStyle] || toPlainText
    setOutputText(genFn(contributorsWithCredits))
  }, [numContributors, selectedStyle])

  const onFormAction = (formData: FormData) => {
    const contributorsWithCredits = formAsContributor(formData)
    const genFn: CreditGenerator = availableStyles[selectedStyle] || toPlainText
    setOutputText(genFn(contributorsWithCredits))
  }

  const onCopyHandler = () => {
    navigator.clipboard.writeText(outputText)

    setShowSuccessCopy(true)
    setTimeout(() => {
      setShowSuccessCopy(false)
    }, 2000)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4'>
      <div className='w-fullconst z-10 flex flex-row gap-4'>
        {/* Left side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-md bg-white/70 shadow'>
          <div className='flex-wggrap flex items-center justify-between px-4 py-5'>
            {/* Card header */}
            <label className='text-xl text-gray-dark'>
              Contributor information
            </label>
          </div>
          <div className='p-5'>
            {/* Content goes here */}
            <form
              id='contributor-form'
              ref={contributorFormRef}
              className='space-y-4 '
              action={onFormAction}
            >
              <fieldset aria-label='Choose the number of contributors'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-medium leading-6 text-gray-dark'>
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
                      className='flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-dark ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none data-[checked]:bg-primary data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-primary-hover sm:flex-1 [&:not([data-focus],[data-checked])]:ring-inset'
                    >
                      {option}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>

              <div>
                {numContributorsIdx.map((num) => (
                  <div key={num} className='mt-2 flex rounded-md shadow-sm'>
                    <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-light sm:text-sm'>
                      Contributor {num}
                    </span>
                    <input
                      id={num + '-contributor'}
                      name={num + '-contributor'}
                      type='text'
                      className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-dark ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    />
                  </div>
                ))}
              </div>

              <fieldset>
                <legend className='sr-only'>Credit roles</legend>
                <div className='flex items-start space-x-2'>
                  {numContributorsIdx.map((id) => (
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
                      <div className='flex h-6 items-center space-x-2'>
                        {numContributorsIdx.map((authId) => (
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
                        <p
                          id={`ckb-${role.name}`}
                          className='text-wrap text-gray-light'
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
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-md bg-white/70 shadow'>
          <div className='flex flex-wrap items-center justify-between px-4 py-4'>
            {/* Card header */}
            <PrimaryButton tabIndex={20} type='submit' form='contributor-form'>
              <PlayIcon className='-ml-0.5 h-5 w-5' />
              Generate Text
            </PrimaryButton>

            <div>
              <select
                id='generator-style'
                name='generator style'
                tabIndex={21}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className='block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                {Object.entries(availableStyles).map(([key, _]) => (
                  <option key={key}>{key}</option>
                ))}
              </select>
            </div>

            <SecondaryButton
              type='submit'
              className='w-24'
              tabIndex={22}
              onClick={onCopyHandler}
            >
              <CheckIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? '' : 'hidden'}`}
              />
              <ClipboardIcon
                className={`-ml-0.5 h-5 w-5 ${showSuccessCopy ? 'hidden' : ''}`}
              />
              {showSuccessCopy ? 'Copied!' : 'Copy'}
            </SecondaryButton>
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
