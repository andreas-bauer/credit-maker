import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import logo from '@/images/robot-logo128.png'

export function Header() {
  return (
    <header className='relative z-50 flex-none pt-4'>
      <div className='mx-auto flex max-w-7xl items-center justify-center px-8'>
        <div className='hidden grow basis-0 sm:flex'>
          <Image src={logo} alt='logo' width={64} height={64} unoptimized />
        </div>

        <div className='mx-auto flex items-center border-b border-blue-600/10'>
          <p className='font-mono text-2xl text-blue-600'>CRediT Maker</p>
        </div>

        <div className='hidden grow basis-0 justify-end gap-x-5 sm:flex'>
          <a
            href='https://credit.niso.org/'
            target='_blank'
            className='hidden items-center gap-x-1.5 font-medium text-blue-600 hover:underline md:inline-flex dark:text-blue-500'
          >
            more about CRediT
          </a>
          <a
            href='https://github.com/andreas-bauer/credit-maker'
            target='_blank'
            className='inline-flex items-center gap-x-1.5 font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            GitHub
            <ArrowRightIcon className='-ml-0.5 h-5 w-5' />
          </a>
        </div>
      </div>
    </header>
  )
}
