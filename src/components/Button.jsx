import React from 'react'

function Button({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  className = '',
  ...props  //spread more props which user can pass
}) {
  return (
    <button onClick={() => {console.log("clicked!!")}} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button