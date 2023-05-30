import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/button'
import { useParams } from 'react-router-dom'

const EditTaluka = () => {
    const parms = useParams()

    const [taluka, setTaluka] = useState()
    const [district, setDistrict] = useState([])
    const [sDistrict, setSdistrict] = useState()

    const navigate = useNavigate()

    const editTaluka = async (e) => {
        e.preventDefault()
        let data = {
            _id: parms.id,
            name: taluka,
            district: sDistrict
        }

        const result = await api('master/taluka/edit', data)

        if (result && result.status === 200) {
            console.log('Taluka Updated success fully')
            navigate("/talukaView/" + parms.id)
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

    // --------- Set velue

    const displayDistrict = async () => {
        let data = {
            _id: parms.id
        }

        const result = await api(`master/taluka/view`, data)

        if (result && result.status === 200) {
            setTaluka(result?.data?.data)
            setSdistrict(result?.data?.data?.district?._id)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayDistrict(); }, [parms.id])

    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Update Taluka</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link={"/talukaView/" + parms.id} class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*taluka</label>
                        <input value={taluka?.name} onChange={(e) => setTaluka(e.target.value)} placeholder='Enter Taluka Name' type="text" />

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">District select</label>
                            <select onChange={(e) => setSdistrict(e.target.value)} value={sDistrict} class="form-control" id="exampleFormControlSelect1">
                                <option disabled>Select district</option>
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
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editTaluka} >
                            Update
                        </button>
                        <Link to={"/talukaView/" + parms.id}>
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

export default EditTaluka
