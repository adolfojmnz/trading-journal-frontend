import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 flex-shrink-0">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} Adolfo Jimenez. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer