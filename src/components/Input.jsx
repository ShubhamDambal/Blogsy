import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
  }, ref){

  const id = useId()  //for generating unique id's
  return (
    <div className='w-full mb-4'>
      {label && (
        <label
          className='block text-sm font-medium text-gray-700 mb-1'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
})

export default Input