import React, { useState } from 'react'
import Button from '../../component/button';
import { api } from '../../services/api';
import { resetError, showError } from '../../services/error';
import Joi from 'joi';

const AddUser = () => {
    let [error, setError] = useState({})
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobileNo, setMobileNo] = useState()

    const validate = (data) => {
        const schema = Joi.object({
            name: Joi.string().max(50).required().label('name'),
            email: Joi.string().email({ tlds: { allow: false } }).required().label('Email id'),
            mobile: Joi.string().min(10).max(11).required().label('Mobile no')
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };

    const addUser = async (e) => {
        resetError();
        e.preventDefault()

        const data = {
            name,
            email_id: email,
            mobile_no: mobileNo,
        }

        const { error } = validate(data)
        if (error) showError(error.details);

        let result = await api('user/add', data)
        if (result && result.status === 200) {
            setName('')
            setEmail('')
            setMobileNo('')
        }
    }

    const oncancel = (e) => {
        e.preventDefault();
        resetError();

        setName('')
        setEmail('')
        setMobileNo('')
    }


    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Add User</h2>
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

                <div className="row mt-3 px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">Mobile No</label>
                        <input id='mobile' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder='Enter Mobile no' type="text" />
                        {error?.name && <span className='error'>{error['mobile']}</span>}
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={addUser} >
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

export default AddUser
