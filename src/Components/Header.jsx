import React from 'react'

function Header() {
    return (
        <div>



            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a class="flex items-center space-x-3 rtl:space-x-reverse"><i className="fa-solid fa-utensils text-white fa-lg"></i>
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Recipe Finder</span>
                    </a>
                </div>
            </nav>


        </div>
    )
}

export default Header