import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

export function Header() {
  return (
    <header className='relative z-50 flex-none pt-4'>
      <div className='mx-auto flex max-w-7xl items-center justify-center px-8'>
        <div className='hidden grow basis-0 sm:flex'>
          <PencilIcon className='-ml-0.5 h-5 w-5' />
        </div>

        <div className='mx-auto flex items-center border-b border-blue-600/10'>
          <p className='font-mono text-2xl text-blue-600'>CREDIT Maker</p>
        </div>

        <div className='hidden grow basis-0 justify-end sm:flex'>
          <a
            target='_blank'
            href='https://github.com/andreas-bauer/credit-maker'
          >
            <button className='inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100'>
              <ArrowTopRightOnSquareIcon className='-ml-0.5 h-5 w-5' />
              GitHub
            </button>
          </a>
        </div>
      </div>
    </header>
  )
}
