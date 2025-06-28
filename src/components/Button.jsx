import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-gray-500',
  textColor = 'text-white',
  className = '',
  ...props  //spread more props which user can pass
}) {
  return (
    <button onClick={() => {console.log("clicked!!")}} className={`cursor-pointer px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button