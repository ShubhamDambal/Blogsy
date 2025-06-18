import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
  }, ref){

  const id = useId()  //for generating unique id's
  return (
    <div className='w-full'>
      {
      label && 
      <label 
      className='inline-block mb-1 pl-1'
      htmlFor={id}>
        {label}
      </label>
      }
      <input 
      type={type} 
      className={`${className}`}
      ref={ref}   //gives reference to the parent component. So from this reference we get to know on which <input> to apply onClick(), etc events. Thus we've used forwardRef().
      {...props}
      id={id}
      />
    </div>
  )
})

export default Input