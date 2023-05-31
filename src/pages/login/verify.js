import React, { useEffect, useState } from 'react'
import { resetError } from '../../services/error';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Verify = () => {

    const emailAddress = localStorage.getItem('email')
    const [verificationCode, setCode] = useState()
    const navigate = useNavigate()

    const verify = async (e) => {
        resetError();
        const data = {
            emailAddress,
            verificationCode
        }

        let respose = await api('company/login/verify', data)

        if (respose) {
            navigate('/signIn')
            localStorage.removeItem('email')
        }
    }


    return (
        <>
            <div class="container height-100 d-flex justify-content-center align-items-center">
                <div class="card rounded shadow rounded-4 p-4 text-center">
                    <h5>Please enter the one time password
                        <br /> to verify your account
                    </h5>
                    <div>
                        <span>A code has been sent to</span>
                        <br />
                        <span className='fs-4'>{emailAddress && emailAddress}</span>
                    </div>
                    <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                        <input onChange={(e) => setCode(e.target.value)} class="m-2 text-center form-control  rounded" type="text" id="first" maxlength="6" minLength="6" />
                    </div>
                    <div class="mt-4">
                        <button onClick={verify} class="btn btn-primary px-4 validate">Validate</button>
                    </div>
                    {/* <div class="content d-flex my-3 justify-content-center align-items-center">
                        <a href="#" class="text-decoration-none ms-3">Resend</a>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Verify
