import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavLeft from './pages/nav/navLeft.jsx';
import NavTop from './pages/nav/navTop.jsx';
import Dashboard from './pages/dashboard';

import Privete from './pages/privete';
import Login from './pages/login/login';
import Verify from './pages/login/verify';

import District from './pages/district/district';
import AddDistrict from './pages/district/addDistrict';
import DistrictView from './pages/district/districtView';
import EditDistrict from './pages/district/editDistrict';

function App() {

  const [sidebar, setSidebar] = useState(false)

  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    setIsLogin(localStorage.getItem('token') && localStorage.getItem('token') != null ? true : false);
  }, [])

  return (
    <>

      <Router>
        <ToastContainer />

        {!isLogin &&
          <>
            <Routes>
              {/* <Route path='/' element={<SingUp />} /> */}
              <Route path='/' element={<Login />} />
              {/* <Route path='/verify' element={<Verify />} /> */}
            </Routes>
          </>
        }

        {isLogin &&
          <div className={`main ${isLogin && sidebar ? 'msb-x' : ''}`}>
            <NavTop side={setSidebar} sidebar={sidebar} />


            <div className="msb" id="msb">
              <NavLeft />
            </div>

            <div className={`${isLogin && 'mcw'}`}>

              <Routes>
                <Route element={<Privete />} >

                  <Route exact path='/' element={<Dashboard />} />

                  <Route path='/district' element={<District />} />
                  <Route path='/addDistrict' element={<AddDistrict />} />
                  <Route path='/districtView/:id' element={<DistrictView />} />
                  <Route path='/editDistrict/:id' element={<EditDistrict />} />

                  <Route path='/vehicle' element={<h1 >hello</h1>} />
                  <Route path='/VehicleView/:id' element={<h1 >hello</h1>} />
                  <Route path='/addVehicle' element={<h1 >hello</h1>} />
                  <Route path='/updateVehicle' element={<h1 >hello</h1>} />

                </Route>

              </Routes>
            </div>
          </div>
        }
      </Router>
    </>
  );
}

export default App;
