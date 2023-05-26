import React, { useState } from 'react'
import Button from '../../component/button';
import { api } from '../../services/api';
import { resetError, showError } from '../../services/error';
import Joi from 'joi';

const AddDistrict = () => {

    const [district, setDistrict] = useState()

    const validate = (data) => {
        const schema = Joi.object({
            name: Joi.string().max(50).required(),
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };

    const addDistrict = async (e) => {
        resetError();
        e.preventDefault()

        const data = { name: district }

        const { error } = validate(data)
        if (error) showError(error.details);

        let result = await api('master/district/add', data)

        setDistrict('')
    }

    const oncancel = (e) => {
        e.preventDefault();
        setDistrict('')
    }


    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Add District</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link='/district' class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*District</label>
                        <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='Enter District Name' type="text" />
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={addDistrict} >
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

export default AddDistrict
