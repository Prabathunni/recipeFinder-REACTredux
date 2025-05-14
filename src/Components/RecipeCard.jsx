import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../Redux/Slice/recipeSlice';

function RecipeCard({ searchedData }) {


  const dispatch = useDispatch();
  const { data: recipes, loading, error } = useSelector((state) => state.recipes)


  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filteredRecipes = searchedData ? recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchedData))
    : recipes;

  if (filteredRecipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes found for "{searchedData}"</p>;
  }


  // save that recipe to the localstorage
  const handleSaveRecipe = (recipe) =>{
    // get existing saved recipes or empty array
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

    // check recipe exits already
    const isAlreadySAved = savedRecipes.some((r)=>r.id === recipe.id);
    if (isAlreadySAved) return alert("Recipee already saved!");

    // add recipee
    savedRecipes.push(recipe);
    localStorage.setItem("savedRecipes",JSON.stringify(savedRecipes));
    alert("Recipe saved");
  }


  return (
    <div>
      <div className="flex justify-center" >
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.name}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {recipe.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {recipe.cuisine} | Difficulty: {recipe.difficulty}
              </p>
              <button
                type="button"
                onClick={()=>handleSaveRecipe(recipe)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-bookmark me-2"></i>Save Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeCard;
