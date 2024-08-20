import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import { useContext, useRef, useState, useEffect } from "react";
import { categoryItems } from '../Store/Categorylist.jsx';
// Custom styles for the dialog
const dialogPaperStyle = {
    minWidth: '500px', // Adjust as needed
    maxWidth: '800px', // Adjust as needed
};
function Addwidget({ isDrawerOpen, closeDrawer }){
      // State to manage active tab
      const [activeTab, setActiveTab] = useState('CSPM');
      // State to manage modal visibility
      const [isModalOpen, setIsModalOpen] = useState(false);
      // State to track which checkboxes are checked
      const [checkedSubcategories, setCheckedSubcategories] = useState(new Set());
      const [searchTerm, setSearchTerm] = useState('');
      // Function to open the drawer
    //   const openDrawer = () => {
    //       setIsDrawerOpen(true);
    //   };
  
      // Function to close the drawer
    //   const closeDrawer = () => {
    //       setIsDrawerOpen(false);
    //   };
      // Function to open the modal
      const openModal = () => {
          setIsModalOpen(true);
      };
  
      // Function to close the modal
      const closeModal = () => {
          setIsModalOpen(false);
      };
  
      // Function to handle the "Add Widget" button click
      const handleAddWidgetClick = () => {
          openModal();
      };
      const handleTabChange = (tab) => {
          setActiveTab(tab);
      };
      const handleBackdropClick = (event) => {
          event.stopPropagation(); // Prevent the dialog from closing when clicking outside
      };
      const { categorydata, addWidget, deleteWidget } = useContext(categoryItems);
      const handleSearch = (term) => {
          setSearchTerm(term);
      };
      // Function to handle checkbox changes
      const handleCheckboxChange = (subcategoryId) => {
          setCheckedSubcategories(prev => {
              const newCheckedSubcategories = new Set(prev);
              if (newCheckedSubcategories.has(subcategoryId)) {
                  newCheckedSubcategories.delete(subcategoryId);
              } else {
                  newCheckedSubcategories.add(subcategoryId);
              }
              return newCheckedSubcategories;
          });
      };
  
      // Function to handle the "Confirm" button click
      const handleConfirmClick = () => {
          if (currentCategory) {
              currentCategory.Subcategories.forEach(subcategory => {
                  if (!checkedSubcategories.has(subcategory.subcategory_id)) {
                      deleteWidget(subcategory.subcategory_heading, subcategory.subcategory_id, currentCategory.CategoryName);
                  }
              });
          }
          closeDrawer();
      };
      // Filter the categories to match the active tab
      const currentCategory = categorydata[0].Categories.find(category => category.CategoryName.includes(activeTab));
      console.log(currentCategory);
      // Filter subcategories based on search term
      const filteredSubcategories = currentCategory
          ? currentCategory.Subcategories.filter(subcategory =>
              subcategory.subcategory_heading.toLowerCase().includes(searchTerm.toLowerCase())
          )
          : [];
      // Initialize checkboxes state when currentCategory or activeTab changes
      useEffect(() => {
          if (currentCategory) {
              setCheckedSubcategories(new Set(currentCategory.Subcategories.map(subcategory => subcategory.subcategory_id)));
          }
      }, [currentCategory, activeTab]);
      const WidgetName = useRef();
      const WidgetText = useRef();
      const handleSubmit = (event) => {
          event.preventDefault();
          const widgetname = WidgetName.current.value.trim();
          const widgettext = WidgetText.current.value.trim();
          console.log(widgetname);
          console.log(widgettext);
          if(widgetname || widgettext){
            addWidget(widgetname, widgettext, currentCategory.Subcategories.length, currentCategory.CategoryName);
          }
          WidgetName.current.value = "";
          WidgetText.current.value = "";
          // Close the modal after handling the submission
          closeModal();
      };
  return  <>
     {/* Drawer component with anchor on the right */}
     <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
            <div style={{ width: 700, display: 'flex', flexDirection: 'column', height: '100%', }}>
                <div style={{
                    width: '100%', backgroundColor: 'navy', color: 'white', padding: '10px 20px', display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h6 style={{ margin: 0 }}>Add Widget</h6>
                    <IoClose size={20} color="white" onClick={closeDrawer} />
                </div>
                <h6 style={{ fontSize: '14px', marginLeft: '10px', marginTop: '10px', marginBottom: '10px' }}>Personalise your dashboard by adding the following widget</h6>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className={`nav-link ${activeTab === 'CSPM' ? 'active' : ''}`} onClick={() => handleTabChange('CSPM')} type="button" role="tab">CSPM</button>
                        <button className={`nav-link ${activeTab === 'CWPP' ? 'active' : ''}`} onClick={() => handleTabChange('CWPP')} type="button" role="tab">CWPP</button>
                        <button className={`nav-link ${activeTab === 'Registry Scan' ? 'active' : ''}`} onClick={() => handleTabChange('Registry Scan')} type="button" role="tab">Image</button>
                        <button className={`nav-link ${activeTab === 'Ticket' ? 'active' : ''}`} onClick={() => handleTabChange('Ticket')} type="button" role="tab">Ticket</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className={`tab-pane fade ${activeTab === 'CSPM' ? 'show active' : ''}`} id="nav-home" role="tabpanel">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px', marginRight: '20px', marginTop: '10px', justifyContent: 'space-between' }}>
                            {currentCategory && currentCategory.Subcategories.map((subcategory) => (
                                <div key={subcategory.subcategory_id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                    <input type="checkbox"
                                        id={`subcategory-${subcategory.subcategory_id}`}
                                        name={`subcategory-${subcategory.subcategory_id}`}
                                        checked={checkedSubcategories.has(subcategory.subcategory_id)}
                                        onChange={() => handleCheckboxChange(subcategory.subcategory_id)} />
                                    <label htmlFor={`subcategory-${subcategory.subcategory_id}`} style={{ marginLeft: '8px' }}>{subcategory.subcategory_heading}</label>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'left', }}>
                                <button type="button" class="btn btn-outline-primary" style={{ color: 'navy' }} onClick={handleAddWidgetClick}>add widget</button>
                            </div >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', marginTop: '20rem' }}>
                                <button className="btn btn-secondary" onClick={closeDrawer} style={{ marginRight: '10px', backgroundColor: 'white', color: 'navy' }}>Cancel</button>
                                <button className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'navy' }} onClick={handleConfirmClick}>Confirm</button>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'CWPP' ? 'show active' : ''}`} id="nav-profile" role="tabpanel">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px', marginRight: '20px', marginTop: '10px', justifyContent: 'space-between' }}>
                            {currentCategory && currentCategory.Subcategories.map((subcategory) => (
                                <div key={subcategory.subcategory_id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                    <input type="checkbox"
                                        id={`subcategory-${subcategory.subcategory_id}`}
                                        name={`subcategory-${subcategory.subcategory_id}`}
                                        checked={checkedSubcategories.has(subcategory.subcategory_id)}
                                        onChange={() => handleCheckboxChange(subcategory.subcategory_id)} />
                                    <label htmlFor={`subcategory-${subcategory.subcategory_id}`} style={{ marginLeft: '8px' }}>{subcategory.subcategory_heading}</label>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'left', }}>
                                <button type="button" class="btn btn-outline-primary" style={{ color: 'navy' }} onClick={handleAddWidgetClick}>add widget</button>
                            </div >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', marginTop: '20rem' }}>
                                <button className="btn btn-secondary" onClick={closeDrawer} style={{ marginRight: '10px', backgroundColor: 'white', color: 'navy' }}>Cancel</button>
                                <button className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'navy' }} onClick={handleConfirmClick}>Confirm</button>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'Registry Scan' ? 'show active' : ''}`} id="nav-contact" role="tabpanel">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px', marginRight: '20px', marginTop: '10px', justifyContent: 'space-between' }}>
                            {currentCategory && currentCategory.Subcategories.map((subcategory) => (
                                <div key={subcategory.subcategory_id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                    <input type="checkbox"
                                        id={`subcategory-${subcategory.subcategory_id}`}
                                        name={`subcategory-${subcategory.subcategory_id}`}
                                        checked={checkedSubcategories.has(subcategory.subcategory_id)}
                                        onChange={() => handleCheckboxChange(subcategory.subcategory_id)} />
                                    <label htmlFor={`subcategory-${subcategory.subcategory_id}`} style={{ marginLeft: '8px' }}>{subcategory.subcategory_heading}</label>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'left', }}>
                                <button type="button" class="btn btn-outline-primary" style={{ color: 'navy' }} onClick={handleAddWidgetClick}>add widget</button>
                            </div >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px', marginTop: '20rem' }}>
                                <button className="btn btn-secondary" onClick={closeDrawer} style={{ marginRight: '10px', backgroundColor: 'white', color: 'navy' }}>Cancel</button>
                                <button className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: 'navy' }} onClick={handleConfirmClick}>Confirm</button>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'Ticket' ? 'show active' : ''}`} id="nav-contact" role="tabpanel">
                        <p>Ticket information goes here.</p>
                    </div>
                </div>
            </div>
        </Drawer>
        <Dialog open={isModalOpen} onClose={closeModal} PaperProps={{
            style: dialogPaperStyle, onBackdropClick: () => { handleBackdropClick }
        }}>
            <DialogTitle>Add Widget Details</DialogTitle>
            <DialogContent>
                <form className="widget-details" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="widgetName" className="form-label">
                            Widget Name
                        </label>
                        <input
                            type="text"
                            ref={WidgetName}
                            className="form-control"
                            id="widgetName"
                            placeholder="Widget Name"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="widgetText" className="form-label">
                            Widget Text
                        </label>
                        <input
                            type="text"
                            ref={WidgetText}
                            className="form-control"
                            id="widgetText"
                            placeholder="Widget Text"
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: "end", gap: "10px" }}>
                        <Button onClick={closeModal} color="primary" >Close</Button>
                        <button type="submit" className="btn btn-primary" >
                            Submit
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
}
export default Addwidget;