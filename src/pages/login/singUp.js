import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';


// import { signInWithGoogle } from './fireBase';
import { app, messaging } from '../login/fireBase'
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'

import { api } from '../../services/api';
import { resetError, showError } from '../../services/error'



const SingUp = () => {

    const [phone, setPhone] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    const [cPass, setCpass] = useState('');

    const navigate = useNavigate()

    const validate = (data) => {
        const schema = Joi.object({
            username: Joi.string().max(100).required().label('Name'),
            password: Joi.string().max(8).required().label('Password'),
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };
    // ----------------


    // --------------------
    const onSignUp = async (e) => {
        resetError();
        e.preventDefault();


        if (pass === cPass) {
            let registerType = "email"
            let data = {
                phoneNo: phone,
                emailAddress: email,
                password: pass,
                registerType
            }

            const { error } = validate(data)
            if (error) showError(error.details);
            let response = await api('company/login/signup', data)

            if (response && response.status === 200) {
                localStorage.setItem('email', data.emailAddress);
                navigate('/verify');
            }
        }
    }



    const signInWithGoogle = async (e) => {

        resetError();
        e.preventDefault()

        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then(async (result) => {

            // const user = firebase.auth().currentUser;

            const uid = result.user.auth.lastNotifiedUid
            const email = result.user.email
            setEmail(email)

            let registerType = "gmail"
            let data = {
                emailAddress: email,
                registerType,
                uid
            }
            const { error } = validate(data)
            if (error) showError(error.details);

            let response = await api('company/login/signup', data)

            if (response && response.status === 200) {
                localStorage.setItem("token", JSON.stringify(data))
                navigate('/')
                window.location.reload(false)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="singUp">

                <div className="s_left">

                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold ">Sign up now</h2>
                                <h4 className='mb-5'>Already have an account?<Link to='/signIn' className='mx-3  text-primary'>Sign In</Link></h4>

                                <form>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" for="form3Example3">Email address</label>
                                        <input type="email" id="form3Example3" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div class="form-outline mb-2">
                                        <label class="form-label" for="form3Example11">Phone No.</label>
                                        <input type="text" id="form3Example11" onChange={(e) => setPhone(e.target.value)} class="form-control" />
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" for="form3Example4">Password</label>
                                        <input type="password" id="form3Example4" className="form-control" onChange={(e) => setPass(e.target.value)} />
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" for="form3Example5">Conform Password</label>
                                        <input type="password" id="form3Example5" onChange={(e) => setCpass(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label className="form-check-label" for="form2Example33">Remember me</label>
                                    </div>

                                    <button type="submit" onClick={onSignUp} className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>

                                    <div className="text-center">
                                        <p>or sign up with:</p>

                                        <button type="button" onClick={signInWithGoogle} className="btn btn-link btn-floating mx-1">
                                            <Icon.Google />
                                        </button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="s_right">
                    <img src={require('../../assets/img/About group.png')} alt="img not found" />
                </div>
            </div>

        </>
    )
}

export default SingUp