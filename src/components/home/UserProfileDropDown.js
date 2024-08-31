import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle, FaCog, FaBell, FaExchangeAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const UserProfileDropdown = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <img
          src="https://via.placeholder.com/40" // Remplacez par l'URL de la photo de profil
          alt="Profile"
          className="rounded-circle"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-2" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://via.placeholder.com/50" // Remplacez par l'URL de la photo de profil
            alt="Profile"
            className="rounded-circle me-3"
          />
          <div>
            <h6 className="mb-0">Alex Stanton</h6>
            <small className="text-muted">alex@example.com</small>
          </div>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item href="#/profile">
          <FaUserCircle className="me-2" />
          View Profile
        </Dropdown.Item>
        <Dropdown.Item href="#/settings">
          <FaCog className="me-2" />
          Account Settings
        </Dropdown.Item>
        <Dropdown.Item href="#/notifications">
          <FaBell className="me-2" />
          Notifications
        </Dropdown.Item>
        <Dropdown.Item href="#/switch">
          <FaExchangeAlt className="me-2" />
          Switch Account
        </Dropdown.Item>
        <Dropdown.Item href="#/help">
          <FaQuestionCircle className="me-2" />
          Help Center
        </Dropdown.Item>
        <Dropdown.Item href="#/logout">
          <FaSignOutAlt className="me-2" />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfileDropdown;
