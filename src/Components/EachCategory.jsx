import { IoMdAdd } from "react-icons/io";
import { useContext, useRef, useState, useEffect } from "react";
import Addwidget from "./Addwidget.jsx";

// Custom styles for the dialog
const dialogPaperStyle = {
    minWidth: '500px', // Adjust as needed
    maxWidth: '800px', // Adjust as needed
};
function EachContainer() {
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
        <div class="card text-center mb-3 d-flex justify-content-center align-items-center" style={{ width: "450px", height: "220px", backgroundColor: " rgb(255, 249, 249)" }}>
            <div class="card-body">
                <a href="#"><button type="button" class="btn btn-outline-secondary" style={{ marginTop: "65px" }} onClick={openDrawer}>Add Widget  <IoMdAdd size={15} /></button></a>
            </div>
        </div>
        {/* Pass the drawer state and control functions to Addwidget component */}
       { isDrawerOpen && <Addwidget isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />}
    </>
}

export default EachContainer;
