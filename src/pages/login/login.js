import React, { useEffect, useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { app, messaging } from '../login/fireBase'

import Joi from 'joi';
import Button from '../../component/button';
import { Link } from 'react-router-dom';

import { signInWithGoogle } from '../login/fireBase';
import { getToken } from 'firebase/messaging';
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'

import { api } from '../../services/api';
import { resetError, showError } from '../../services/error'
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [fcmToken, setFcmToken] = useState('')

    const navigate = useNavigate()


    const validate = (data) => {
        const schema = Joi.object({
            username: Joi.string().max(100).required().label('Name'),
            password: Joi.string().max(8).required().label('Password'),
        });
        return schema.validate(data, { abortEarly: false, allowUnknown: true });
    };

    // -------------------

    const onLogIn = async (e) => {
        resetError();
        e.preventDefault();

        let data = {
            username: email,
            password: pass
        }

        const { error } = validate(data)
        if (error) showError(error.details);

        let response = await api('auth/', data)

        console.log(response)

        if (response && response.status === 200) {
            console.log("ok")
            navigate('/')
        }
    }

    // ---------------Google

    const signInWithGoogle = async (e) => {
        resetError();
        e.preventDefault()

        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then(async (result) => {

            // const user = firebase.auth().currentUser;

            const uid = result.user.auth.lastNotifiedUid
            const email = result.user.email
            console.log(uid)

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
                // window.location.reload(false)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="singUp ">

                <div className="s_left ">

                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h2 className="fw-bold mb-5">Sign In Now</h2>
                                {/* <h4 className='mb-5'>Don't have an account?<Link to='/' className='mx-3 text-primary'>Sign up</Link></h4> */}
                                <form>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" for="form3Example3">Email address</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control" />
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label" for="form3Example4">Password</label>
                                        <input type="password" id="form3Example4" onChange={(e) => setPass(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                                        <label className="form-check-label" for="form2Example33">Remember me</label>
                                    </div>

                                    <button type="submit" onClick={onLogIn} className="btn btn-primary btn-block mb-4">
                                        Login
                                    </button>

                                    <div className="text-center">
                                        <p>Or Sign In With:</p>

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

export default Login






