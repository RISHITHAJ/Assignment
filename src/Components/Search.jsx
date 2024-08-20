import React, { useState, useContext } from 'react';
import { categoryItems } from '../Store/Categorylist.jsx';
const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const { categorydata } = useContext(categoryItems);
    const handleSearch = (event) => {
        const text = event.target.value;
        setSearchText(text);
        if (text.trim() !== '') {
            const filteredData =
                categorydata.map(dashboard => {
                    const filteredCategories = dashboard.Categories.map(category => {
                        if (category.Subcategories && Array.isArray(category.Subcategories)) {
                            const filteredSubcategories = category.Subcategories.filter(subcategory =>
                                subcategory.subcategory_heading.toLowerCase().includes(searchText.toLowerCase())
                            );
                            return {
                                ...category,
                                Subcategories: filteredSubcategories,
                            };
                        }
                        return category;
                    }).filter(category => category.Subcategories && category.Subcategories.length > 0);

                    return {
                        ...dashboard,
                        Categories: filteredCategories,
                    };
                }).filter(dashboard => dashboard.Categories && dashboard.Categories.length > 0);
            onSearch(filteredData, true);
        } else {
            onSearch(categorydata, false);
        }
    };

    return (
        <form className="me-3" role="search" style={{ width: "30rem" }}>
            <input
                type="search"
                className="form-control"
                placeholder="Search anything..."
                value={searchText}
                onChange={handleSearch}
            />
        </form>
    );
};

export default Search;
