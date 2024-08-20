import React from 'react';
import Subcategory from "./Subcategory";
const SearchDashboard = ({ results }) => {
    console.log(results);
    return (
        <div>
            <h3 style={{ fontSize: '14px' ,marginLeft:'25px'}}>Search Results</h3>
            {results.map((dashboard, index) => (
                <div key={index}>
                    {dashboard.Categories.map((category, index) => (
                        console.log(category),
                        <div className="category">
                            <h6>{category.CategoryName}</h6>
                            <div className="card-grid">
                                {category.Subcategories.map((subcategory, subIndex) => (
                                    <Subcategory key={subIndex} subcategory={subcategory} />
                                ))}
                            </div>
                        </div>))}
                </div>
            ))}
        </div>
    );
};

export default SearchDashboard;
