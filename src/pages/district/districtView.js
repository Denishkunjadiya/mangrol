import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../component/button'

const DistrictView = () => {

    const [district, setDistrict] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    const displayDistrict = async () => {
        let data = {
            _id: params.id
        }
        const result = await api(`master/district/view`, data)

        if (result && result.status === 200) {
            setDistrict(result.data.data)
        } else {
            console.log('error')
        }

    }
    useEffect(() => { displayDistrict(); }, [params.id])


    // ----------------- delete

    const deleteDistrict = async () => {
        const data = {
            _id: params.id
        }
        let result = await api(`master/district/delete`, data)
        if (result && result.status === 200) {
            console.log("data deletad successfully")
            navigate('/district')
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <div className="admin_page_top">
                <h2>View District</h2>
                <div>
                    <Button link='/district' iHeight='15px' class='btn-primary mx-3' icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' />
                    <Button link={`/editDistrict/${params.id}`} iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-pen-to-square text-light"></i>} name='Update' />
                </div>
            </div>

            <div className='w-100 d-flex justify-content-center '>
                <div className="card w-50 text-center rounded-4 ">
                    <h1>Distric Name</h1>
                    <h2>{district.name} </h2>
                </div>
            </div>

            <div className=' bottom-0 w-100 '>
                <button onClick={deleteDistrict} className='btn btn-light'><i class="mx-3 fa-solid fa-trash"></i>Delete</button>
            </div>

        </>
    )
}

export default DistrictView