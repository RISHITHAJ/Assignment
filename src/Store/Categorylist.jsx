import { createContext, useReducer } from "react";

let default_categorylist = [{
    DashboardName: "CNAPP Dashboard",
    Categories: [{
        categoryId: 1,
        CategoryName: "CSPM Executive Dashboard",
        Subcategories: [{
            subcategory_id: 1,
            subcategory_heading: 'Cloud Accounts',
            type: "Pie",
            data: {
                labels: ['Connected', 'Not Connected'],
                datasets: [
                    {
                        label: 'Sample Data',
                        data: [2, 2],
                        fill: true,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            }
        },
        {
            subcategory_id: 2,
            subcategory_heading: 'Cloud Risk Assessment',
            type: "Pie",
            data: {
                labels: ['Failed', 'warning', 'Not avaliable', 'passed'], // Labels for each segment of the pie chart
                datasets: [
                    {
                        label: 'Sample Data',
                        data: [1689, 681, 36, 7253],
                        fill: true,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(234, 239, 44, 0.6)',
                            'rgba(237, 233, 157, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(234, 239, 44, 1)',
                            'rgba(237, 233, 157, 1)',

                        ],
                        borderWidth: 1,
                    },
                ],
            }
        }]
    },
    {
        categoryId: 2,
        CategoryName: "CWPP Dashboard",
        Subcategories: [{
            subcategory_id: 1,
            subcategory_heading: 'Top 5 Namespace Specific Alerts',
            type: "No content",
            data: {
            }
        },
        {
            subcategory_id: 2,
            subcategory_heading: 'Workload Alerts',
            type: "No content",
            data: {
            }
        }]
    },
    {
        categoryId: 2,
        CategoryName: "Registry Scan",
        Subcategories: [{
            subcategory_id: 1,
            subcategory_heading: 'Image Risk Assessments',
            total: "1470 Total Vulnerabilities",
            type: "progress-bar",
            data:
                [
                    {
                        color: 'bg-danger',
                        percentage: 50,
                        label: 'Critical',
                    },
                    {
                        color: 'bg-info',
                        percentage: 20,
                        label: 'High'
                    },
                    {
                        color: 'bg-warning',
                        percentage: 10,
                        label: 'Moderate'
                    },
                    {
                        color: 'bg-success',
                        percentage: 10,
                        label: 'Mild',
                    }
                ]

        },
        {
            subcategory_id: 2,
            subcategory_heading: 'Image Security Issues',
            type: "progress-bar",
            total: "2 Total Images",
            data: [
                {
                    color: 'bg-danger',
                    percentage: 50,
                    label: 'Critical',
                },
                {
                    color: 'bg-info',
                    percentage: 20,
                    label: 'High'
                },
                {
                    color: 'bg-warning',
                    percentage: 10,
                    label: 'Moderate'
                },
                {
                    color: 'bg-success',
                    percentage: 20,
                    label: 'Mild',
                }
            ]
        }]
    }],
}];
const data = {
    categoryList: default_categorylist,
    addWidget: () => { },
    deleteWidget: () => { },
}
let postItemsReducer = (currentCategorydata, action) => {
    let newcategoryList = currentCategorydata;
    if (action.type == 'ADD-WIDGET') {
        newcategoryList = currentCategorydata[0].Categories.map(categorymap => {
            if (categorymap.CategoryName === action.categoryName) {
                // Create a new object for the updated category
                const updatedCategory = {
                    ...categorymap,
                    Subcategories: [
                        ...categorymap.Subcategories, // Keep existing subcategories
                        action.payload // Add the new subcategory from the payload
                    ]
                };
                return updatedCategory; // Return the updated category
            }
            return categorymap; // Return the category as is if it doesn't match
        });
        // Update the currentCategorydata with the new categories list
        return [{ ...currentCategorydata[0], Categories: newcategoryList }];
    }
    else if (action.type == 'DELETE-WIDGET') {
        // Delete widget logic
        const newcategoryList = currentCategorydata[0].Categories.map(category => {
            if (category.CategoryName === action.categoryName) {
                // Update the category by filtering out the subcategory
                return {
                    ...category,
                    Subcategories: category.Subcategories.filter(subcategory => subcategory.subcategory_id !== action.payload.subcategory_id)
                };
            }
            return category; // Return the category as is if it doesn't match
        });

        // Return the updated categories list
        return [{ ...currentCategorydata[0], Categories: newcategoryList }];
    }
    return newcategoryList;
}
export const categoryItems = createContext(data);

const CategoryItemprovider = ({ children }) => {
    let [categorydata, dispatchCategoryItems] = useReducer(postItemsReducer, default_categorylist);

    const addWidget = (widgetName, widgetText, categoryLength, categoryName) => {
        dispatchCategoryItems({
            type: 'ADD-WIDGET',
            categoryName: categoryName,
            payload: {
                subcategory_id: categoryLength + 1,
                subcategory_heading: widgetName,
                type: "Text",
                data: widgetText,
            }
        })
    };
    const deleteWidget = (subcategory_heading, subcategory_id, categoryName) => {
        dispatchCategoryItems({
            type: 'DELETE-WIDGET',
            categoryName: categoryName,
            payload: {
                subcategory_id: subcategory_id,
                subcategory_heading: subcategory_heading,
            }
        })
    }
    return <>
        <categoryItems.Provider value={{ categorydata, addWidget, deleteWidget }}>{children}</categoryItems.Provider>
    </>
};

export default CategoryItemprovider;
