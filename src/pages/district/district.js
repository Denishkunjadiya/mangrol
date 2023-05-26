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



    return (
        <div>
            <div className="admin_page_top">
                <h2>District</h2>
                <Button link='/addDistrict' iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-plus"></i>} name='Add' />
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {district.map((item) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={"/districtView/" + item._id}><i class="fa-regular fa-eye"></i></Link>
                                    {/* <i class="mx-3 fa-solid fa-pen-to-square"></i> */}
                                    {/* <i onClick={() => deleteDistrict(item._id)} class="mx-3 fa-solid fa-trash"></i> */}
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
