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

import Taluka from './pages/taluka/taluka';
import AddTaluka from './pages/taluka/addTaluka';
import TalukaView from './pages/taluka/talukaView';
import EditTaluka from './pages/taluka/editTaluka';

import Zone from './pages/zone/zone';
import ZoneView from './pages/zone/zoneView';
import AddZone from './pages/zone/addZone';
import EditZone from './pages/zone/editZone';

import BusinessType from './pages/businessType/businessType';
import AddBusinessType from './pages/businessType/addBusinessType';
import BusinessView from './pages/businessType/businessView';
import EditBusinessType from './pages/businessType/editBusinessType';

import PowerSupply from './pages/powerSupply/powerSupply';
import AddPowerSupply from './pages/powerSupply/addPowerSupply';
import PowerSupplyView from './pages/powerSupply/powerSupplyView';
import EditPowerSupply from './pages/powerSupply/editPowerSupply';

import User from './pages/user/user';
import AddUser from './pages/user/addUser';
import UserView from './pages/user/userView';
import EditUser from './pages/user/editUser';

import Association from './pages/association/association';
import EditAssociation from './pages/association/editAssociation';

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

                  <Route path='/taluka' element={<Taluka />} />
                  <Route path='/addTaluka' element={<AddTaluka />} />
                  <Route path='/talukaView/:id' element={<TalukaView />} />
                  <Route path='/editTaluka/:id' element={<EditTaluka />} />

                  <Route path='/zone' element={<Zone />} />
                  <Route path='/addZone' element={<AddZone />} />
                  <Route path='/zoneView/:id' element={<ZoneView />} />
                  <Route path='/editZone/:id' element={<EditZone />} />

                  <Route path='/businessType' element={<BusinessType />} />
                  <Route path='/addBusinessType' element={<AddBusinessType />} />
                  <Route path='/businessTypeView/:id' element={<BusinessView />} />
                  <Route path='/editBusinessType/:id' element={<EditBusinessType />} />

                  <Route path='/powerSupply' element={<PowerSupply />} />
                  <Route path='/addPowerSupply' element={<AddPowerSupply />} />
                  <Route path='/powerSupplyView/:id' element={<PowerSupplyView />} />
                  <Route path='/editPowerSupply/:id' element={<EditPowerSupply />} />

                  <Route path='/user' element={<User />} />
                  <Route path='/addUser' element={<AddUser />} />
                  <Route path='/userView/:id' element={<UserView />} />
                  <Route path='/editUser/:id' element={<EditUser />} />

                  <Route path='/association' element={<Association />} />
                  <Route path='/editAssociation/:id' element={<EditAssociation />} />

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
