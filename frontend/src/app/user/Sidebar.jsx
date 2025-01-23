import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    const [activePage, setActivePage] = useState("");

    useEffect(() => {
        const page = pathname.split('/').pop();
        setActivePage(page);
    }, [pathname])


    return (
        <div>
            <aside className={`fixed inset-y-0 left-0 bg-white p-6 shadow-md transform transition-transform duration-500 ease-in-out z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 lg:w-64`} >
                <h2 className="text-xl font-bold mb-8">Profile</h2>
                <nav>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/company/profile" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === 'profile' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">🏠</span> Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/company/company-form" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === 'company-form' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">📊</span>Add Info
                            </Link>
                        </li>
                        <li>
                            <Link href="/company/interview-form" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === 'interview-form' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">🗂</span> Add Interview
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === '' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">📋</span> Tasks
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === '' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">📈</span> Reporting
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === '' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">🎨</span> Designers
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mt-10">
                    <h3 className="text-gray-500 uppercase tracking-wider text-sm">Support</h3>
                    <ul className="space-y-4 mt-4">
                        <li>
                            <a href="#" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === '' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">⚙️</span> Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`text-gray-600 hover:text-purple-600 flex items-center py-2 ${activePage === '' ? 'bg-gray-300' : ''} `}>
                                <span className="mr-3">💬</span> Support
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar