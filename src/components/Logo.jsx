import React from 'react'
import blogger from "/blogger.png"

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={blogger} className="w-10 h-auto rounded"/>
    </div>
  )
}

export default Logo