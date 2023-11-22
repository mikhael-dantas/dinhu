import React from "react"

// import { Container } from './styles';

const DINHU1Header: React.FC<{
  name: string
}> = ({ name }) => {
  return (
    <div className="w-[96%] mx-auto">
      <h1
        className={`ml-5 text-2xl font-semibold my-4 text-gray-800 dark:text-gray-100
  `}
      >
        {name}
      </h1>
      <hr className={`mb-8 border border-gray-700 dark:border-gray-300 w-[100%]`} />
    </div>
  )
}

export default DINHU1Header
