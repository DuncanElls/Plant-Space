import React, { useContext, useEffect, useState } from 'react'
import http from '../../services/api.service'
import { GardenContext, UserContext } from '../../App';
import './UserPage.css'
import { Link, Outlet } from 'react-router-dom';

export default function HomePage() {
    const [plants, setPlants] = useState([])
    const [garden, setGarden] = useState([])
    const { activeUser } = useContext(UserContext)

    useEffect(() => {
        getPlantsData()
    }, [])

    useEffect(() => {
        getGardenData()
    }, [])

    function deletePlantData(plantId) {
        http.removeFromGarden(activeUser.id, plantId)
            .then(response => {
                console.log(response.data)
                getGardenData()
            })
    }

    function handlePlusClicked() {

    }

    function getPlantsData() {

        http.getAllPlants(plants)
            .then((response) => {
                console.log(response.data)
                setPlants(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    function getGardenData() {

        http.getGardenByUserId(activeUser.id)
            .then((response) => {
                console.log(response.data)
                setGarden(response.data)
            })
            .catch(err => {
                setGarden([])
            })
    }

    return (
        <div className="userpage-root">
            <div className='user-plant-display'>
                <div className="add-garden-plants">
                    <div className="plant-images">
                        {garden.map((plant) => (
                            <div>
                                <span onClick={() => { deletePlantData(plant.id) }} className="remove-x" >Remove Plant</span>
                                <Link to={String(plant.id)} style={{ textDecoration: 'none' }}>
                                    <img width={100} className="home-image left"
                                        src={plant.image}
                                        alt="" />
                                    <br />
                                    <span>{plant.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
