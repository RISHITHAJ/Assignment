import { IoMdAdd } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import Category from "./category.jsx";
import { useContext,useState } from "react";
import { categoryItems } from '../Store/Categorylist.jsx';
import SearchDashboard  from './SearchDashboard.jsx';
import Addwidget from "./Addwidget.jsx";
function Dashboard({ searchActive, filteredData }) {
    const { categorydata } = useContext(categoryItems);
     // State to manage drawer visibility
     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

     // Function to open the drawer
     const openDrawer = () => {
         setIsDrawerOpen(true);
     };
 
     // Function to close the drawer
     const closeDrawer = () => {
         setIsDrawerOpen(false);
     };
    return <>
        {categorydata.map((dashboard, index) => (
            <div key={index} class="dashboard d-flex justify-content-between align-items-center" style={{ marginLeft: "10px", marginRight: "10px" }}>
                <h5 style={{ fontSize: "16px", marginLeft: "15px" }}>{dashboard.DashboardName}</h5>
                <div className="addactions d-flex align-items-center" style={{ gap: "10px" }}>
                    <button type="button" class="btn btn-outline-secondary" onClick={openDrawer}>Add Widget  <IoMdAdd size={15} /></button>
                    <button type="button" class="btn btn-outline-secondary"><FiRefreshCcw size={15} /></button>
                    <button type="button" class="btn btn-outline-secondary"><IoMdMore size={17} /></button>
                    <div class="">
                        <button class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <FaClock style={{ marginRight: "5px" }} color="navy" />
                            <div class="vr me-2"></div>
                            <span style={{ color: "navy" }}>Last 2 days</span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="#">Option 1</a></li>
                            <li><a class="dropdown-item" href="#">Option 2</a></li>
                            <li><a class="dropdown-item" href="#">Option 3</a></li>
                        </ul>
                    </div>
                </div>
                 {/* Pass the drawer state and control functions to Addwidget component */}
       { isDrawerOpen && <Addwidget isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />}
            </div>
        ))}
        {searchActive ? <SearchDashboard results={filteredData}></SearchDashboard> : <Category></Category>}
    </>
}
export default Dashboard;