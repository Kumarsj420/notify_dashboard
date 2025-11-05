import React from 'react'

interface IntroProps {
    children?: React.ReactNode;
}

const Intro: React.FC<IntroProps> = ({children}) => {
  return (
    <p className='text-sc-600'>
      {children}
    </p>
  )
}

export default Intro
