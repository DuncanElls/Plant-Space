import React, { useEffect, useRef, useState } from 'react'
import './CategoryPage.css'
import http from '../../services/api.service'
import { useLocation, useParams } from 'react-router-dom'
import FlexProductDisplay from '../plantDisplays/FlexProductDisplay';

export default function CategoryPage() {

    const { category } = useParams();
    // look for a query
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, [category])

    var location = useLocation();
    const autoScrollRef = useRef(null);

    useEffect(() => {
        // 'snap to' some element
        if (location.pathname.includes('/home/')) {
            console.log("on the 'categories' page")
            autoScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [location])

    function getProducts() {
        if (category) {
            http.getProductsByCategory(category)
                .then((response) => {
                    setProducts(response.data);
                });
        } else {
            http.getAllProducts()
                .then((response) => {
                    setProducts(response.data);
                });
        }
    }

    return (
        <div className='category-root'>
            <div ref={autoScrollRef}></div>
            <FlexProductDisplay title={category || 'All Products'} products={products} />
        </div>
    )
}

