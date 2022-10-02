import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api';

function getPlantsByCategory(category) {
    return axios.get(`${BASE_URL}/plants/category/${category}`)
}
function getPlantsByUserId(userId) {
    return axios.get(`${BASE_URL}/plantItems/${userId}`)
}

function getAllPlants() {
    return axios.get(`${BASE_URL}/plants`)
}

function getPlantById(plantId) {
    return axios.get(`${BASE_URL}/plants/${plantId}`)
}

function getAllUsers() {
    return axios.get(`${BASE_URL}/users`)
}

function getUserById(userId) {
    return axios.get(`${BASE_URL}/users/${userId}`)
}

function getUserByEmail(email) {
    return axios.get(`${BASE_URL}/users/email/${email}`);
}

function createUser({ email, password }) {
    return axios.post(`${BASE_URL}/users`, { email, password })
}

function getGardenByUserId(userId) {
    return axios.get(`${BASE_URL}/gardenItems/${userId}`)
}

function getAllGardensItems() {
    return axios.get(`${BASE_URL}/gardenItems`)
}

function addToGarden(activeUserId, plantId) {
    return axios.post(`${BASE_URL}/gardenItems`, {
        userId: activeUserId,
        plantId: plantId
    });
}

function removeFromGarden(activeUserId, plantId) {
    return axios.delete(`${BASE_URL}/gardenItems/${activeUserId}/${plantId}`);
}

function login({ email, password }) {
    return axios.post(`${BASE_URL}/users/login`,
        { email, password })
}

function updateUser({ email, password, userId }) {
    return axios.put(`${BASE_URL}/users/${userId}`,
        { email, password })
}

function deleteUserById(userId) {
    return axios.delete(`${BASE_URL}/users/${userId}`);
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    login,
    createUser,
    updateUser,
    deleteUserById,
    getAllPlants,
    getPlantsByCategory,
    getPlantsByUserId,
    getPlantById,
    getAllGardensItems,
    getGardenByUserId,
    removeFromGarden,
    addToGarden
}
