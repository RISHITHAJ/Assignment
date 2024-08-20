import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { categoryItems } from '../Store/Categorylist.jsx';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import ProgressBar from './ProgressBar';
import { IoStatsChartOutline } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';
import { useContext, } from "react";

// Register the components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Subcategory({ subcategory }) {
    const { categorydata, deleteWidget } = useContext(categoryItems);
    const findCategoryNameBySubcategoryId = (subcategoryId) => {
        for (const category of categorydata[0].Categories) {
            const subcategory = category.Subcategories.find(sub => sub.subcategory_id === subcategoryId);
            if (subcategory) {
                return category.CategoryName;
            }
        }
        return null; // Return null or some default value if not found
    };
    const categoryName = findCategoryNameBySubcategoryId(subcategory.subcategory_id);
    console.log('Category Name:', categoryName);
    const HandledeleteWidget = () => {
        console.log(subcategory.subcategory_heading);
        deleteWidget(subcategory.subcategory_heading, subcategory.subcategory_id, categoryName);
    }
    console.log(subcategory);

    const segments = subcategory;
    const renderContent = () => {
        switch (subcategory.type) {
            case "Pie":
                return (<div className="pie-chart-container">
                    <div className="pie-chart">
                        <Pie data={subcategory.data} style={{ height: "170px", display: "flex" }} options={{ responsive: false, maintainAspectRatio: false }} />
                    </div>
                </div>);
            case "Line":
                return <Line data={subcategory.data} options={{ responsive: true, maintainAspectRatio: false }} />;
            case "progress-bar":
                return (
                    <ProgressBar segments={segments} />
                );
            case "No content":
                return (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                        <IoStatsChartOutline size={25} color='grey' />
                        <p style={{ color: 'gray', marginTop: '10px' }}>No graph data available</p>
                    </div>
                );
            case "Text":
                return (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                        <p style={{ color: 'gray', marginTop: '10px' }}>{subcategory.data}</p>
                    </div>
                );
            default:
                return <div>No content available</div>;
        }
    };
    return (
        <>
            <div
                className="card text-center mb-3 d-flex justify-content-center align-items-center"
                style={{ width: '450px', height: '220px', backgroundColor: 'rgb(255, 249, 249)' }}
            >
                <button type="button" className="btn btn-danger position-absolute"
                    style={{
                        top: '0px',
                        right: '0px',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '50%',
                        fontSize: '0.8rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} onClick={HandledeleteWidget}
                >
                    <FaTimes size={12} color="white" />
                </button>
                <div className="card-body" style={{ width: '100%', height: '100%' }}>
                    <h6 class="card-subtitle mb-2 text-body-secondary" style={{ textAlign: "left", marginLeft: "5px" }}>{subcategory.subcategory_heading}</h6>
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Subcategory;
