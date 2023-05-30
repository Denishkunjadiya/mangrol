import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/button'
import { useParams } from 'react-router-dom'

const EditBusinessType = () => {

    const parms = useParams()
    const [businessType, setBusinessType] = useState([])
    const navigate = useNavigate()

    const editBusinessType = async (e) => {
        e.preventDefault()
        let data = {
            _id: parms.id,
            name: businessType
        }

        const result = await api('master/business_type/edit', data)

        if (result && result.status === 200) {
            console.log('Destrict Updated success fully')
            navigate("/businessTypeView/" + parms.id)
        }
    }

    // --------- Set velue

    const displayBusinessType = async () => {
        let data = {
            _id: parms.id
        }

        const result = await api(`master/business_type/view`, data)

        if (result && result.status === 200) {
            setBusinessType(result?.data?.data)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayBusinessType(); }, [parms.id])

    console.log(businessType)


    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Update BusinessType</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link={"/businessTypeView/" + parms.id} class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*BusinessType</label>
                        <input value={businessType.name} onChange={(e) => setBusinessType(e.target.value)} placeholder='Enter BusinessType Name' type="text" />
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editBusinessType} >
                            Update
                        </button>
                        <Link to={"/businessTypeView/" + parms.id}>
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

export default EditBusinessType
