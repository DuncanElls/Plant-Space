import './PlantCard.css'
import http from '../../services/api.service'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PlantCard() {
    const [plant, setPlant] = useState([])
    const { plantId } = useParams()
    useEffect(() => {
        getPlantData()
    }, [plantId])
    function getPlantData() {
        http.getPlantById(plantId)
            .then((response) => {
                console.log(response.data)
                setPlant(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }
    return (
        <div className='plant-info'>
            <div className='plant-category'>
                <p>
                    Category:
                </p>
                <span>
                    {plant.category}
                </span>
            </div>
            <div className='plant-category'>
                Size:
                <span>
                    {plant.size}
                </span>
            </div>
            <div className='plant-category'>
                Watering:
                <span>
                    {plant.water}
                </span>
            </div>
            <div className='plant-category'>
                Description:
                <span>
                    {plant.description}
                </span>
            </div>
            <div className='plant-category'>
                Light:
                <div>
                    {plant.light}
                </div>
            </div>
        </div>
    )
}
