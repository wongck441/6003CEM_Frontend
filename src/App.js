import logo from './logo.svg';
import './App.css';

// elements
import NavBar from './elements/general/NavBar';
import Main from './elements/home/Main';
import DogDetails from './elements/home/DogDetails';
import Register from './elements/account/RegisterationPage';
import EditDogInfo from './elements/workerFunctions/EditDogInfo';
import AddDogInfo from './elements/workerFunctions/AddDogInfo';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Component = (comp) => {
  return (
    <>
      <NavBar />
      {comp}
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Component(<Main />)} />
          <Route path="/dogDetails" element={Component(<DogDetails />)} />
          <Route path="/register" element={Component(<Register />)} />
          <Route path="/charityWorker/editDogInfo" element={Component(<EditDogInfo />)} />
          <Route path="/charityWorker/addDogInfo" element={Component(<AddDogInfo />)} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
