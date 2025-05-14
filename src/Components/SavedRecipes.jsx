import React, { useEffect, useState } from "react";

function SavedRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        setSavedRecipes(data);
        if (data.length > 0) {
            setSelectedRecipe(data[0]);
        }
    }, []);

    const handleDelete = (id) => {
        const updated = savedRecipes.filter((r) => r.id !== id);
        localStorage.setItem("savedRecipes", JSON.stringify(updated));
        setSavedRecipes(updated);
        if (selectedRecipe?.id === id) {
            setSelectedRecipe(updated[0] || null);
        }
    };

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    };

    if (savedRecipes.length === 0) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-2">Saved Recipes</h1>
                <hr />
                <p className=" text-gray-500 mt-20">no saved recipe</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-green-600 mb-2 text-center">Saved Recipes</h1>
            <hr />

            <div className="flex flex-col md:flex-row gap-8 justify-center mt-5">
                {/* LEFT: Recipe table */}
                <div className="overflow-x-auto w-full md:w-1/2">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Recipe Name</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedRecipes.map((recipe) => (
                                <tr
                                    key={recipe.id}
                                    onClick={() => handleSelectRecipe(recipe)}
                                    className={`cursor-pointer ${selectedRecipe?.id === recipe.id
                                            ? "bg-blue-100 dark:bg-gray-600"
                                            : "bg-white dark:bg-gray-800"
                                        } border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {recipe.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(recipe.id);
                                            }}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* RIGHT: Recipe details */}
                {selectedRecipe && (
                    <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {selectedRecipe.name}
                        </h2>

                        <img
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            src={selectedRecipe.image || "https://via.placeholder.com/150"}
                            alt="Recipe"
                        />

                        <div className="mb-4 space-y-1">
                            <p><strong>Cuisine:</strong> {selectedRecipe.cuisine || "N/A"}</p>
                            <p><strong>Difficulty:</strong> {selectedRecipe.difficulty || "N/A"}</p>
                            <p><strong>Prep Time:</strong> {selectedRecipe.prepTimeMinutes || "N/A"} mins</p>
                            <p><strong>Cook Time:</strong> {selectedRecipe.cookTimeMinutes || "N/A"} mins</p>
                        </div>

                        {selectedRecipe.ingredients && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Ingredients</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {selectedRecipe.ingredients.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedRecipe.instructions && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Preparation</h3>
                                <ol className="list-decimal list-inside text-gray-600">
                                    {selectedRecipe.instructions.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedRecipes;
