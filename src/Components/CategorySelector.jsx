import React from 'react'

const CategorySelector = ({ category, onCategoryChange }) => {
    const Categories = [
        { id: "general", name: "General" },
        { id: "business", name: "Business" },
        { id: "entertainment", name: "Entertainment" },
        { id: "health", name: "Health" },
        { id: "science", name: "Science" },
        { id: "sports", name: "Sports" },
        { id: "technology", name: "Technology" },
    ]
    return (
        <div className='flex justify-center'>
            <div className='btn-group space-x-6 p-2 text-sm md:text-base border-b border-gray-400'>
                {Categories.map(cat => (
                    <button
                        onClick={() => onCategoryChange(cat.id)}
                        className={`btn ${category === cat.id ? "btn-active" : ""}`}
                        key={cat.id}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorySelector
