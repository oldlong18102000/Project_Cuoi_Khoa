import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, NavDropdown, Nav } from 'react-bootstrap';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, NavLink } from 'react-router-dom';


const Header = (props) => {
    const [hideProfile, setHideProfile] = useState({ display: 'none' });
    const [hideSideBar, setHideSideBar] = useState(true);

    return (
        <>
            <header className="main-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} >
                    <i className="fa-solid fa-bars" onClick={() => setHideSideBar(!hideSideBar)}></i>
                    <div className="brand-logo">
                        <div className="brand-logo-name">
                            Gear Focus Admin
                        </div>
                    </div>
                </div>
                <nav className="main-nav">
                    <i className="fa-regular fa-user"
                        onMouseEnter={e => {
                            setHideProfile({ display: 'inline-block' });
                        }}
                        onMouseLeave={e => {
                            setTimeout(() => { setHideProfile({ display: 'none' }) }, 1500)
                        }}
                    ></i>
                </nav>
            </header>
            <div className="sidebar" style={{ ...hideSideBar ? { display: 'inline-block' } : { display: 'none' } }}>
                <ul style={{ listStyle: "inline-block" }}>
                    <li><Link to="/products/manage-product"><i className="fa-solid fa-tag"></i>Catalog</Link></li>
                    <li><Link to="/products/manage-product">Products</Link></li>
                    <li><Link to="/user/manage-user"><i className="fa-solid fa-user-group"></i>User</Link></li>
                    <li><Link to="/user/manage-user">User list</Link></li>
                </ul>
            </div>
            <div className="profile-logout" style={hideProfile}>
                <ul style={{ listStyle: "none" }}>
                    <li><a href='#'>My profile</a></li>
                    <li>admin.training@powergatesoftware.com</li>
                    <li><a href='#'>Log out</a></li>
                </ul>
            </div>
        </>
    )
}
export default Header;