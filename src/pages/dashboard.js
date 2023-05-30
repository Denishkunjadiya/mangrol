import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

const Dashboard = () => {

    const [district, setDistrict] = useState([])
    const [taluka, setTaluka] = useState([])
    const [zone, setZone] = useState([])
    const [businessType, setBusinessType] = useState([])
    const [powerSupply, setPowerSupply] = useState([])
    const [user, setUser] = useState([])
    const [member, setMember] = useState([])


    // ---------------- district

    const showDistrict = async () => {
        const result = await api('master/district/')
        setDistrict(result?.data?.total_records)
    }

    // ------------------- Taluka

    const showTaluka = async () => {
        const result = await api('master/taluka/')
        setTaluka(result?.data?.total_records)
    }

    // ------------------- Zone

    const showZone = async () => {
        const result = await api('master/zone/')
        setZone(result?.data?.total_records)
    }

    // ------------------- businessType

    const showbusinessType = async () => {
        const result = await api('master/business_type/')
        setBusinessType(result?.data?.total_records)
    }

    // ------------------- powerSupply

    const showpowerSupply = async () => {
        const result = await api('master/power_supply/')
        setPowerSupply(result?.data?.total_records)
    }

    // ------------------- Association

    const showUser = async () => {
        const result = await api('user/')
        console.log(result)
        setUser(result?.data?.total_records)
    }

    // ------------------- member

    const showMember = async () => {
        const result = await api('member/')
        setMember(result?.data?.total_records)
    }



    useEffect(() => {
        showDistrict();
        showTaluka();
        showZone();
        showbusinessType();
        showpowerSupply();
        showUser();
        showMember();
    }, [])


    return (
        <>
            <div className="container-fluid py-5 Count_container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box ">
                        <p className="text-left ">district</p>
                        <span className="span text-center">{district}</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">taluka</p>
                        <span className="span text-center">{taluka}</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">zone</p>
                        <span className="span text-center">{zone}</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">businessType</p>
                        <span className="span text-center">{businessType}</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">powerSupply</p>
                        <span className="span text-center">{powerSupply}</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">User</p>
                        <span className="span text-center"> {user} </span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">member</p>
                        <span className="span text-center">{member}</span>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard
