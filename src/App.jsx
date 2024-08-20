import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Dashboard from './Components/Dashboard'
import CategoryItemprovider from './Store/Categorylist';
import React, { useState } from 'react';
function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = (data, isSearching) => {
    setFilteredData(data);
    setSearchActive(isSearching);
  };
  return <>
    <div className="App-container">
      <CategoryItemprovider>
        <Header onSearch={handleSearch}></Header>
        <Dashboard searchActive={searchActive} filteredData={filteredData}></Dashboard>
      </CategoryItemprovider>
    </div>
  </>
}

export default App
