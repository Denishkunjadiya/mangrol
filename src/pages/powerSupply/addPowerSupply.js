import React, { useState } from 'react'
import Button from '../../component/button';
import { api } from '../../services/api';
import { resetError, showError } from '../../services/error';
import Joi from 'joi';

const AddPowerSupply = () => {


    const [powerSupply, setPowerSupply] = useState()
    let [error, setError] = useState({})

    const validate = (data) => {
        const schema = Joi.object({
            powerSupply: Joi.string().max(50).required().label('name')
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };

    const addPowerSupply = async (e) => {
        resetError();
        e.preventDefault()

        const data = {
            name: powerSupply
        }

        const { error } = validate(data)
        if (error) showError(error.details);

        let result = await api('master/power_supply/add', data)
        setPowerSupply('')
    }

    const oncancel = (e) => {
        e.preventDefault();
        resetError();

        setPowerSupply('')
    }


    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Add PowerSupply</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link='/powerSupply' class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*PowerSupply</label>
                        <input id='powerSupply' value={powerSupply} onChange={(e) => setPowerSupply(e.target.value)} placeholder='Enter PowerSupply Name' type="text" />
                        {error?.name && <span className='error'>{error['name']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={addPowerSupply} >
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

export default AddPowerSupply
