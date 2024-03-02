import React, { Component } from 'react';
import './NavbarStyles.css';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {
        clicked: false,
        isLoggedIn: true 
    };

    handleClicked = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <nav className='NavbarItems'>
                <h1 className='navbar-logo'>Robot Trade</h1>
                <div className='menu-icons' onClick={this.handleClicked}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        );
                    })}
                    
                    {this.state.isLoggedIn ? (
                        <button className='nav-links' onClick={this.handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to='/login'>
                                <button className='nav-links'>Log in</button>
                            </Link>
                            <Link to='/signup'>
                                <button className='nav-links'>Sign up</button>
                            </Link>
                        </>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Navbar;


