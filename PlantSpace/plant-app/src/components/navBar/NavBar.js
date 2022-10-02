import React, { useContext, useState } from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


export default function NavBar() {

    const { activeUser, logout } = useContext(UserContext)

    return (
        <div className='nav-root'>
            <nav className='nav-bar' >
                <div className='left'>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHouse} className='home-button icon' />
                    </Link>
                </div>
                <div className='right'>
                    {activeUser
                        ? (
                            <>
                                <Link to="/myGarden" >
                                    <button className='garden-text'>
                                        <FontAwesomeIcon icon={faSeedling} className='garden icon' />
                                        Garden
                                    </button>
                                </Link>
                                <div className='active-user'>{activeUser.email}</div>
                                <button onClick={logout} className="logout">
                                    Logout
                                </button>
                            </>
                        )
                        :
                        <div className="logged-out">
                            <Link to="/login">
                                <button className='login'>
                                    Login
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </nav >
        </div >
    )
}
