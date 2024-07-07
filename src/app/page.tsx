import { allCreditRoles } from './credit-roles'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-12'>
      <div className='flex w-full flex-row gap-4'>
        {/* Left side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
          <div className='px-4 py-5'>
            {/* Card header */}
            <label className='text-xl'>Author information</label>
          </div>
          <div className='space-y-4 p-5'>
            {/* Content goes here */}
            <div className='rounded-md p-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
              <label
                htmlFor='author-name'
                className='block text-xs font-medium text-gray-900'
              >
                Author name
              </label>
              <input
                id='author-name'
                name='author-name'
                type='text'
                placeholder='Andreas Bauer'
                className='block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0'
              />
            </div>

            <fieldset>
              <legend className='sr-only'>Credit roles</legend>
              <div className='space-y-5'>
                {allCreditRoles.map((role) => (
                  <div key={role.name} className='relative flex items-start'>
                    <div className='flex h-6 items-center'>
                      <input
                        id={`ckb-${role.name}`}
                        name={role.name}
                        type='checkbox'
                        aria-describedby={`${role.name}-description`}
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
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
          </div>
        </div>

        {/* Right side */}
        <div className='w-1/2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
          <div className='px-4 py-5 '>
            {/* Card header */}
            <label className='text-xl'>Generated output</label>
          </div>
          <div className='px-4 py-5'>{/* Content goes here */}</div>
        </div>
      </div>
    </main>
  )
}
