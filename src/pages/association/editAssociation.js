import React, { useEffect, useState } from 'react'
import Button from '../../component/button';
import { api } from '../../services/api';
import { resetError, showError } from '../../services/error';
import Joi from 'joi';
import { useParams } from 'react-router-dom';

const EditAssociation = () => {
    const [error, setError] = useState()
    const param = useParams()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [add1, setAdd1] = useState()
    const [add2, setAdd2] = useState()
    const [city, setCity] = useState()
    const [pincode, setPinCode] = useState()

    const [district, setDistrict] = useState()
    const [taluka, setTaluka] = useState()

    const [districtList, setDistrictList] = useState([])
    const [talukaList, setTalukaList] = useState([])


    const editAssociation = async (e) => {
        e.preventDefault()
        const data = {
            _id: param.id,
            name: name,
            phone_no: mobileNo,

        }

        let result = await api('association/edit', data)

    }

    const oncancel = (e) => {
        e.preventDefault();
        resetError();

        setName('')
        setEmail('')
        setMobileNo('')
        setAdd1('')
        setAdd2('')
        setCity('')
        setPinCode('')
    }

    // ----------------------setRecord

    const District = async (e) => {
        setDistrict(e.target.value)

        let data = {
            district: district
        }

        const setTaluka = await api('association/get_taluka_list', data)
        setTalukaList(setTaluka.data.data)
    }

    const setRecord = async () => {


        const result = await api('association/view')

        setDistrictList(result?.data?.data?.master?.district)

        setName(result.data?.data?.association[0].name)
        setEmail(result.data.data.association[0].email_id)
        setMobileNo(result.data.data.association[0].phone_no)
        setAdd1(result.data.data.association[0].address.address_line_1)
        setAdd2(result.data.data.association[0].address.address_line_2)
        setCity(result.data.data.association[0].address.city)
        setPinCode(result.data.data.association[0].address.pincode)

    }

    useEffect(() => {
        setRecord()
    }, [])

    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Edit Association</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link='/user' class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*User</label>
                        <input id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter User Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}
                    </div>
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*Email Id</label>
                        <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Id' type="text" />
                        {error?.name && <span className='error'>{error['email']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">mobileNo</label>
                        <input id='mobileNo' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder='Enter mobileNo Name' type="number" />
                        {error?.name && <span className='error'>{error['mobileNo']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-11 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*Address-1</label>
                        <input id='name' value={add1} onChange={(e) => setAdd1(e.target.value)} placeholder='Enter User Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-11 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">Address-2</label>
                        <input id='email' value={add2} onChange={(e) => setAdd2(e.target.value)} placeholder='Enter Email Id' type="text" />
                        {error?.name && <span className='error'>{error['email']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*city</label>
                        <input id='name' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter User Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}
                    </div>
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*pincode</label>
                        <input id='name' value={pincode} onChange={(e) => setPinCode(e.target.value)} placeholder='Enter User Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}
                    </div>
                </div>
                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">District select</label>
                            <select onChange={District} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>Select District</option>
                                {districtList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Taluka select</label>
                            <select onChange={(e) => setTaluka(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>Select Taluka</option>
                                {talukaList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editAssociation} >
                            Add
                        </button>
                        <button style={{ letterSpacing: '2px' }} className=' btn mx-3 btn-light' onClick={oncancel} >
                            Cancel
                        </button>
                    </div>
                </div>

            </form>

        </>
    )
}

export default EditAssociation
