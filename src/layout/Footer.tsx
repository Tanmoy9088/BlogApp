// import React from 'react'

const Footer = () => {
  const year = new Date();
  const date = year.getFullYear()
  return (
    <div className='w-full h-[50px] bg-black text-zinc-50 text-center'>Tanmoy--copyright@{date}</div>
  )
}

export default Footer