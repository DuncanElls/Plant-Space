import React, { useContext, useEffect, useState } from 'react'
import './MainPage.css'
import { UserContext } from '../../App';
import http from '../../services/api.service'
import { useToasts } from '../toasts/ToastService';

export default function MainPage() {
    const toast = useToasts();
    const { activeUser, login } = useContext(UserContext);
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        getPlantsData()
    }, [])


    function handlePlantClicked(plantId) {
        console.log(activeUser)
        http.addToGarden(activeUser.id, plantId)
            .then((response) => {
                toast.success("Plant was added to your garden!")
                console.log("plant was added")
            })
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

    return (
        < div className='main-root' >
            <div className='title'>
                PlantSpace
            </div>
            <div className='about'>
                The app for discovering and learning about plants.
            </div>

            <div className="image-container">

                <div className="plant-images">
                    {plants.map((plant) => (
                        <div onClick={() => {
                            handlePlantClicked(plant.id);
                        }}>
                            <img width={100} className="home-image"
                                src={plant.image}
                                alt="" />
                            <br />
                            <span>{plant.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}