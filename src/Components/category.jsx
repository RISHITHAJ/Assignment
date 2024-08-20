import EachContainer from "./EachCategory";
import Subcategory from "./Subcategory";
import { useContext } from "react";
import { categoryItems } from '../Store/Categorylist.jsx';
function Category() {
    const { categorydata } = useContext(categoryItems);
    return <>
        {categorydata[0].Categories.map((category, index) => (
            console.log(category),
            <div className="category">
                <h6>{category.CategoryName}</h6>
                <div className="card-grid">
                    {category.Subcategories.map((subcategory, subIndex) => (
                        <Subcategory key={subIndex} subcategory={subcategory} />
                    ))}
                    <EachContainer />
                </div>
            </div>))}
    </>
}
export default Category;