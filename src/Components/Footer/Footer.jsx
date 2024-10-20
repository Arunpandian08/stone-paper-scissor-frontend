import React from 'react'

const Footer = () => {
    const date = new Date()
  return (
    <footer className='footer border-top bg-white py-4 bottom-0'>
        <div className="container">
            <p className="text-center">
            {date.getFullYear()} &copy; All copyrights are reserved by Arunpandian
            </p>
        </div>
    </footer>
  )
}

export default Footer