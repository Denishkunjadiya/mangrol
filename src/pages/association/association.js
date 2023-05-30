import React, { useEffect, useState } from 'react'
import Button from '../../component/button'
import { api } from '../../services/api'


const Association = () => {
    const [association, setAssociation] = useState([])
    const [district, setDistrict] = useState('')
    const [taluka, setTaluka] = useState('')
    const [id, setId] = useState('')

    const displayAssociation = async () => {
        let result = await api('association/view')
        setAssociation(result.data.data.association)
        setDistrict(result.data.data.master.district[0])
        setTaluka(result.data.data.master.taluka[0])
        setId(result.data.data.association[0]._id)
    }

    useEffect(() => {
        displayAssociation()
    }, [])

    return (
        <>
            <div className="admin_page_top float-end my-4">
                <Button link={`/editAssociation/${id}`} iHeight='15px' class=' btn-primary' icon={<i class="fa-solid fa-pen-to-square text-light"></i>} name='Update' />
            </div>

            <div className='w-100 d-flex justify-content-center '>
                {association.map((item) => {
                    return <>

                        <div className="col-md-11 p-0 my-5 rounded-4 card col-sm-11 text-center py-5 m-2 box ">
                            <h1 >Association </h1>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3> Association Name</h3>
                                </div>
                                <div className="col-5 border-bottom">
                                    <h3>{item.name} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3> Email</h3>
                                </div>
                                <div className="col-5 border-bottom">
                                    <h3>{item.email_id} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3> Mobile No</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{item.phone_no} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3> Address_line_1</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{item.address.address_line_1} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3> Address_line_2</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{item.address.address_line_2} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize " >
                                    <h3>City</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{item.address.city} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize" >
                                    <h3> Pincode</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{item.address.pincode} </h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 border-bottom text-capitalize" >
                                    <h3> taluka</h3>
                                </div>
                                <div className="col-5 border-bottom ">
                                    <h3>{district.name}</h3>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5 text-capitalize" >
                                    <h3> district</h3>
                                </div>
                                <div className="col-5 ">
                                    <h3>{taluka.name}</h3>
                                </div>
                            </div>

                        </div>
                    </>
                })}
            </div>


        </>
    )
}

export default Association
