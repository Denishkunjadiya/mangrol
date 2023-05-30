import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../component/button'

const UserView = () => {
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    const displayUser = async () => {
        let data = {
            _id: params.id
        }
        const result = await api(`user/view`, data)

        if (result && result.status === 200) {
            setUser(result.data.data)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayUser(); }, [params.id])


    // ----------------- delete

    const deleteUser = async () => {
        const data = {
            _id: params.id
        }
        let result = await api(`user/remove`, data)
        if (result && result.status === 200) {
            console.log("data deletad successfully")
            navigate('/user')
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <div className="admin_page_top">
                <h2>View User</h2>
                <div>
                    <Button link='/user' iHeight='15px' class='btn-primary mx-3' icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' />
                    <Button link={`/editUser/${params.id}`} iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-pen-to-square text-light"></i>} name='Update' />
                </div>
            </div>

            <div className='w-100 d-flex justify-content-center '>
                <div className="col-md-6 p-0 my-5 rounded-4 card col-sm-11 text-center py-5 m-2 box ">
                    <h1 >Distric </h1>
                    <div className="row justify-content-center">
                        <div className="col-5 border-bottom text-capitalize" >
                            <h3> user Name</h3>
                        </div>
                        <div className="col-5 border-bottom">
                            <h3>{user.name} </h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-5 border-bottom text-capitalize" >
                            <h3> Email</h3>
                        </div>
                        <div className="col-5 border-bottom">
                            <h3>{user.email_id} </h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-5 border-bottom text-capitalize" >
                            <h3> Mobile No</h3>
                        </div>
                        <div className="col-5 border-bottom">
                            <h3>{user.mobile_no} </h3>
                        </div>
                    </div>

                    <div className="row justify-content-center" >
                        <div className="col-5 text-capitalize">
                            <h3>Status</h3>
                        </div>
                        <div className="col-5 align-items-center d-flex justify-content-center">
                            <p className='fs-2 m-0 '>
                                {user.status === true ? <i style={{ color: "#00b30c" }} className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000", }} ></i>}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className=' bottom-0 w-100 '>
                <button onClick={deleteUser} className='btn btn-light'><i class="mx-3 fa-solid fa-trash"></i>Delete</button>
            </div>

        </>
    )
}

export default UserView
