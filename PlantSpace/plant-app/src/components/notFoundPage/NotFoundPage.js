import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
    return (
        <div className='not-found-root'>
            <div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
            <div>
                <Link to='/' className='return-home'>Return Home</Link>
            </div>
        </div>
    )
}
