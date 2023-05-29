import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'
import Button from '../../component/button'

const District = () => {

    const [district, setDistrict] = useState([])

    const showDistrict = async () => {
        let result = await api('master/district/')
        setDistrict(result?.data?.data)
    }

    useEffect(() => { showDistrict() }, [])

    // ----------- status


    const handleStatus = async (item) => {
        // setStatus(item.status)
        // setId(item._id)

        const data = {
            _id: item._id,
            status: (!item.status)
        }
        const result = await api('master/district/status', data)

        if (result && result.status === 200) {
            showDistrict()
        }

    }

    return (
        <div>
            <div className="admin_page_top">
                <h2>District</h2>
                <Button link='/addDistrict' iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-plus"></i>} name='Add' />
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {district.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td style={{ cursor: "pointer" }} className='fs-3' onClick={() => handleStatus(item)}>
                                    {item.status === true ? <><i style={{ color: "#00b30c" }} className="fa-solid fa-circle-check"></i></> : <><i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000", }} ></i></>}
                                </td>
                                <td className='fs-3'>
                                    <Link to={"/districtView/" + item._id}><i class="fa-regular fa-eye"></i></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}

export default District
