import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../component/button'

const PowerSupplyView = () => {

    const [powerSupply, setPowerSupply] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    const displayPowerSupply = async () => {
        let data = {
            _id: params.id
        }
        const result = await api(`master/power_supply/view`, data)

        if (result && result.status === 200) {
            setPowerSupply(result.data.data)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayPowerSupply(); }, [params.id])


    // ----------------- delete

    const deletePowerSupply = async () => {
        const data = {
            _id: params.id
        }
        let result = await api(`master/power_supply/delete`, data)
        if (result && result.status === 200) {
            console.log("data deletad successfully")
            navigate('/powerSupply')
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <div className="admin_page_top">
                <h2>View Power Supply</h2>
                <div>
                    <Button link='/powerSupply' iHeight='15px' class='btn-primary mx-3' icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' />
                    <Button link={`/editPowerSupply/${params.id}`} iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-pen-to-square text-light"></i>} name='Update' />
                </div>
            </div>

            <div className='w-100 d-flex justify-content-center '>
                <div className="col-md-6 p-0 my-5 rounded-4 card col-sm-11 text-center py-5 m-2 box">
                    {/* <h1 >Power Supply </h1> */}
                    <div className="row justify-content-center">
                        <div className="col-5 border-bottom text-capitalize" >
                            <h3> powerSupply Name</h3>
                        </div>
                        <div className="col-5 border-bottom">
                            <h3>{powerSupply.name} </h3>
                        </div>
                    </div>

                    <div className="row justify-content-center" >
                        <div className="col-5 text-capitalize">
                            <h3>Status</h3>
                        </div>
                        <div className="col-5 align-items-center d-flex justify-content-center">
                            <p className='fs-2 m-0 '>
                                {powerSupply.status === true ? <i style={{ color: "#00b30c" }} className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000", }} ></i>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' bottom-0 w-100 '>
                <button onClick={deletePowerSupply} className='btn btn-light'><i class="mx-3 fa-solid fa-trash"></i>Delete</button>
            </div>

        </>
    )
}

export default PowerSupplyView
