import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/button'
import { useParams } from 'react-router-dom'
import Joi from 'joi'
import { resetError, showError } from '../../services/error';


const EditUser = () => {
    const parms = useParams()
    let [error, setError] = useState({})
    const navigate = useNavigate()

    const [user, setUser] = useState([])
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

    const editUser = async (e) => {
        e.preventDefault()
        let data = {
            _id: parms.id,
            name: user,
            email_id: email,
            mobile_no: mobileNo
        }

        const { error } = validate(data)
        if (error) showError(error.details);

        const result = await api('user/edit', data)

        if (result && result.status === 200) {
            console.log('Destrict Updated success fully')
            navigate("/userView/" + parms.id)
        }
    }

    // --------- Set velue

    const displayUser = async () => {
        let data = {
            _id: parms.id
        }

        const result = await api(`user/view`, data)

        if (result && result.status === 200) {
            setUser(result?.data?.data.name)
            setEmail(result?.data?.data.email_id)
            setMobileNo(result?.data?.data.mobile_no)


        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayUser(); }, [parms.id])



    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Update User</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link={"/userView/" + parms.id} class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*User</label>
                        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder='Enter User Name' type="text" />
                        {error?.name && <span className='error'>{error['email']}</span>}

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
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editUser} >
                            Update
                        </button>
                        <Link to={"/userView/" + parms.id}>
                            <button style={{ letterSpacing: '2px' }} className=' btn mx-3 btn-light'  >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>

            </form>
        </>
    )
}

export default EditUser
