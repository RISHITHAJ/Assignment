import { MdOutlineNotificationsActive } from "react-icons/md";
import { useState } from "react";
import Search from './Search';
function Header({ onSearch }) {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (filteredData, searchActive) => {
    setIsSearching(searchActive);
    onSearch(filteredData, searchActive);
  };
  return <>
    <header className="p-3 mb-3 border-bottom" style={{ backgroundColor: "white" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center" style={{ "grid-template-columns": "1fr 2fr;", }}>
        <div className="dropdown">
          <div className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0  text-decoration-none" >
            <h5 style={{ fontSize: "13px", color: "grey" }}>Home{'>'}</h5>
            <h5 style={{ fontSize: "13px", color: "navy" }}>Dashboard</h5>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <Search onSearch={handleSearch} />
          <MdOutlineNotificationsActive size={20} style={{ marginRight: "15px" }} color="grey" />
          <div className="flex-shrink-0 dropdown">
            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </>
}
export default Header;