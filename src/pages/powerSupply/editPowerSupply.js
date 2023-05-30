import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/button'
import { useParams } from 'react-router-dom'

const EditPowerSupply = () => {

    const parms = useParams()
    const [powerSupply, setPowerSupply] = useState([])
    const navigate = useNavigate()

    const editPowerSupply = async (e) => {
        e.preventDefault()
        let data = {
            _id: parms.id,
            name: powerSupply
        }

        const result = await api('master/power_supply/edit', data)

        if (result && result.status === 200) {
            console.log('Destrict Updated success fully')
            navigate("/powerSupplyView/" + parms.id)
        }
    }

    // --------- Set velue

    const displayPowerSupply = async () => {
        let data = {
            _id: parms.id
        }

        const result = await api(`master/power_supply/view`, data)

        if (result && result.status === 200) {
            setPowerSupply(result?.data?.data)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayPowerSupply(); }, [parms.id])



    return (
        <>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Update PowerSupply</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link={"/powerSupplyView/" + parms.id} class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*PowerSupply</label>
                        <input value={powerSupply.name} onChange={(e) => setPowerSupply(e.target.value)} placeholder='Enter PowerSupply Name' type="text" />
                    </div>
                </div>

                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editPowerSupply} >
                            Update
                        </button>
                        <Link to={"/powerSupplyView/" + parms.id}>
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

export default EditPowerSupply
