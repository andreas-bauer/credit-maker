export function Footer() {
  return (
    <footer className='flex-none bg-white py-2'>
      <div className='flex items-center justify-end'>
        <p className='z-40 mr-4 text-base text-gray-light'>
          Copyright &copy; {new Date().getFullYear()} Andreas Bauer. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
