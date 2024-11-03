import React from 'react'

const Sidebar = () => {
  return (
    <div className=''>
         <aside className="lg:w-64 w-full bg-white p-6 shadow-md flex-shrink-0 h-full">
        <h2 className="text-2xl font-bold mb-8">User Dashboard</h2>
        <nav>
          <ul className="space-y-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">🏠</span> Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">📁</span> My Projects
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">⚙️</span> Settings
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center">
                <span className="mr-3">💬</span> Messages
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar