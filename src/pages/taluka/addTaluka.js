import React, { useEffect, useState } from 'react'
import Button from '../../component/button';
import { api } from '../../services/api';
import { resetError, showError } from '../../services/error';
import Joi from 'joi';

const AddTaluka = () => {

    const [taluka, setTaluka] = useState()
    const [district, setDistrict] = useState([])
    const [sDistrict, setSdistrict] = useState()

    let [error, setError] = useState({})

    const validate = (data) => {
        const schema = Joi.object({
            taluka: Joi.string().max(50).required().label('name')
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };

    const addTaluka = async (e) => {
        resetError();
        e.preventDefault()

        const data = {
            name: taluka,
            district: sDistrict
        }
        const { error } = validate(data)
        if (error) showError(error.details);


        let result = await api('master/taluka/add', data)
        if (result && result.status === 200) {
            setTaluka('')
        }
    }
    // ----------------get District

    const getDistrict = async () => {
        let result = await api('master/taluka')
        if (result && result.status === 200) {
            setDistrict(result?.data?.master?.districts)
        }
    }

    useEffect(() => {
        getDistrict();
    }, [])


    // -------------------------

    const oncancel = (e) => {
        e.preventDefault();
        resetError();
        setTaluka('')
        setSdistrict('')
    }


    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Add Taluka</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link='/taluka' class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*Taluka</label>
                        <input id='taluka' value={taluka} onChange={(e) => setTaluka(e.target.value)} placeholder='Enter Taluka Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">District select</label>
                            <select onChange={(e) => setSdistrict(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                                <option disabled>Select Status</option>
                                {district.map((item, i) => {
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
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={addTaluka} >
                            Add
                        </button>
                        <button style={{ letterSpacing: '2px' }} className=' btn mx-3 btn-light' onClick={oncancel} >
                            Cancel
                        </button>
                    </div>
                </div>

            </form >
        </>
    )
}

export default AddTaluka
