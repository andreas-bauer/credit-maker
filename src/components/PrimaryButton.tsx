import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function PrimaryButton({ className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center items-center rounded-md bg-primary gap-x-1.5 py-2 px-3 text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70',
    className
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
