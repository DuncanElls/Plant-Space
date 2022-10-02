import './App.css';
import { Navigate, Outlet } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage';
import { createContext, useEffect, useState } from 'react';
import http from './services/api.service'
import Login from './components/login/Login';
import NavBar from './components/navBar/NavBar';
import { ToastProvider, useToasts } from './components/toasts/ToastService';

export const UserContext = createContext(null);
export const GardenContext = createContext(null);

function App() {

  const [activeUser, setActiveUser] = useLocalStorage('activeUser');
  const [garden, setGarden] = useState([])
  const toast = useToasts();


  useEffect(() => {
    if (activeUser) {
      getGarden();
    }
  }, [])

  function login(newUser) {
    setActiveUser(newUser)
  }

  function logout() {
    setActiveUser(null);
  }

  function removeFromGarden(itemId) {
    http.removeFromGarden(activeUser.id, itemId)
      .then(res => {
        setGarden(garden.filter(item => item.id !== itemId));
      })
      .catch(error => {
        // handle error
      });

  }

  function addToGarden({ id, size, name, image, category, description, temperature, light }) {
    if (checkItemIsAlreadyInGarden(id)) {
      updateGarden(id, garden)
    } else {
      http.addToGarden(activeUser.id, id)
        .then(results => {
          setGarden([...garden, { id, size, name, image, category, description, temperature, light }]);
          toast.success('Item was added to garden');
        }).catch(err => {
          console.error(err);
        }).finally(() => {
          console.log('added to garden');
        });
    }

  }

  function updateGarden(itemId) {
    http.increaseGarden(activeUser.id, itemId)
      .then(results => {
        // update state after api is updated
        setGarden(garden.map(item => {
          if (item.id == itemId) {
            return {
              ...item
            }
          } else {
            return item
          }
        }));
      }).catch(err => {
        console.error(err);
        // setWasItemAdded(false);
      }).finally(() => {
        console.log('added to garden');
        // setItemAdded(true)
      });
  }

  function getGarden() {
    // use active user id
    http.getGardenByUserId(activeUser.id)
      .then(results => {
        results.data?.length > 0 && setGarden(results.data);
      })
      .catch(err => {
        // handle error here
      });
  }

  function checkItemIsAlreadyInGarden(itemid) {
    return garden.find(item => item.id === itemid)
  }



  return (
    <UserContext.Provider value={{ activeUser, login, logout }}>
      <GardenContext.Provider value={{ garden, removeFromGarden, addToGarden }}>
        <div className="App">
          <NavBar />
          <main>
            <Outlet />
          </main>
        </div>
      </GardenContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
