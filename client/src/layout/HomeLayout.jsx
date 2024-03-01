import React from 'react'
import { Outlet , NavLink} from 'react-router-dom'

function HomeLayout() {
    //check local storage for token
    const token = localStorage.getItem('token')
  return (
    <>
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {token ? (
                    <>
                    <li>
                        <NavLink to="/logout">Logout</NavLink>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    </>
                )
                    }
            </ul>
        </nav>
    </header>
    
    <main>
        <Outlet/>
    </main>
    
    </>
    
  )
}

export default HomeLayout