import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import RecipeCard from './Components/RecipeCard'
import SavedRecipes from './Components/SavedRecipes'

function App() {

  const [clickedsaved,setClickedsaved] = useState(false);
  
  // for taking input data
  const [searchquery,setSearchquery] = useState('');
  const [submittedquery,setSubmittedquery] = useState('');

  

  const handleSearch = (e)=>{
    e.preventDefault();
    const trimmedQuery = searchquery.trim().toLowerCase()
    setSubmittedquery(trimmedQuery);
    
    console.log(submittedquery);
          

    
  }


  const savedRecipe = () =>{
      setClickedsaved(true)
  }



  return (
    <>

      <Header />

      <div className="mt-5 flex justify-center items-start gap-4 flex-wrap">


        <form className="max-w-md w-full relative" onSubmit={handleSearch}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for recipe"
              value={searchquery}
              onChange={(e)=>setSearchquery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        <button onClick={() => savedRecipe()}
          type="button"
          className="h-fit  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <i className="fa-solid fa-bookmark me-2"></i>Saved Recipes
        </button>
      </div>



      <div className='mt-10 p-5'>

          {
            clickedsaved?<SavedRecipes/>:<RecipeCard searchedData ={submittedquery} />

          }

      </div>





    </>
  )
}

export default App
