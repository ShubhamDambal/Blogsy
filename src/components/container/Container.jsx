//This is common style for applying where this kind of style is required.

import React from 'react'

function Container({children}) {
  return <div className='w-full px-4'>{children}</div>;
}

export default Container