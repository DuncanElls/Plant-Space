import React from 'react'
import ProductCard from '../productCard/ProductCard'
import './HorizontalProductDisplay.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function HorizontalProductDisplay({ title, products }) {
    return (
        <div className='horizontal-display-root'>
            <h2 className='title'>
                {title}:
            </h2>
            <div className='carousel'>
                <div className='products-container'>
                    {products.map(p => (
                        <ProductCard key={p.id} {...p} />
                    ))}
                </div>
            </div>
        </div >
    )
}
