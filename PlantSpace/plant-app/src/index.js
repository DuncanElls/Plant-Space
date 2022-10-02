import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryPage from './components/categoryPage/CategoryPage'
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import Login from './components/login/Login';
import MainPage from './components/mainPage/MainPage';
import UserPage from './components/userPage/UserPage';
import PlantCard from './components/plantCard/PlantCard';
import { ToastProvider } from './components/toasts/ToastService'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path='/' element={<App />}>

            <Route path='/myGarden' element={<UserPage />}>
              <Route path='/myGarden/:plantId' element={<PlantCard />} />

            </Route>
            {/* <Route path='/myGarden/asdfasdf' element={<PlantDetail />} /> */}
            <Route path='' element={<MainPage />} />


            <Route path='/plants' element={<CategoryPage />} />
            <Route path='/plants/category/:category' element={<CategoryPage />} />

            {/* <Route path='/gardenItems' element={<UserPage />} />
          <Route path='/gardenItems/:id' element={<UserPage />} />
          <Route path='/gardenItems/:userId' element={<UserPage />} />
          <Route path='/gardenItems/:userId/plantId' element={<UserPage />} /> */}

            <Route path='/login' element={<Login />} />

            <Route path="*" element={<NotFoundPage />} />

          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
