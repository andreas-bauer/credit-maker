export function Footer() {
  return (
    <footer className='flex-none bg-white py-2'>
      <div className='flex items-center justify-end'>
        <p className='text-gray-light z-40 mr-4 text-base'>
          Copyright &copy; {new Date().getFullYear()} Andreas Bauer. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}
