import React from 'react'

interface TitleProps {
    children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({children}) => {
  return (
    <h3 className='font-bold text-3xl'>
      {children}
    </h3>
  )
}

export default Title
