import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'
import Button from '../../component/button'
import Pagination from '../../component/pagination'

import * as luIcon from "react-icons/lu";
import * as biIcon from "react-icons/bi";

const District = () => {

    let quePar = new URLSearchParams(window.location.search);
    let param = quePar.get('page_no')
    let iniPage = parseInt(param)

    const [tRecord, setTRecord] = useState(0)
    let [recPerPage, setRecPerPage] = useState(5)
    const [cPage, setCpage] = useState(!!iniPage ? iniPage : 1)

    let pageCount = Math.ceil(tRecord / recPerPage)

    const [district, setDistrict] = useState([])
    let [sortBy, setSortBy] = useState('')
    let [sortType, setSortType] = useState(-1)

    let [name, setName] = useState('')
    let [status, setStatus] = useState('')


    const showDistrict = async (pageNo) => {
        console.log(pageNo)

        let data = {
            skip_number: (pageNo - 1) * recPerPage,
            record_per_page: recPerPage,
            sort_by: sortBy,
            sort_type: sortType,
            name: name,
            status: status
        }

        let result = await api('master/district/', data)
        if (result && result.status === 200) {
            if (result?.data?.total_records) {
                setTRecord(result?.data?.total_records)
            }
            setDistrict(result?.data?.data)
        }
    }

    useEffect(() => {
        setCpage(cPage)
        showDistrict(!!param ? param : 1)
    }, [recPerPage])

    // ----------------- page Change

    const pageChange = async (page) => {
        let cPage = page.selected + 1;
        showDistrict(cPage)
        window.history.replaceState({}, '', window.location.pathname + '?page_no=' + cPage)
    }

    // ----------- status


    const handleStatus = async (item) => {
        setStatus(item.status)

        const data = {
            _id: item._id,
            status: (!item.status)
        }
        const result = await api('master/district/status', data)

        if (result && result.status === 200) {
            showDistrict()
            setStatus('')
        }

    }

    // ------------------------ sort 

    const sort = (key) => {
        if (sortBy === key) {
            sortType = sortType == 1 ? -1 : 1;
        }
        else {
            sortBy = key
            sortType = 1
        }
        setSortBy(sortBy);
        setSortType(sortType)
        showDistrict()
    }

    const getIcon = (key) => {
        if (key === sortBy && sortType == 1) {
            return <biIcon.BiUpArrowAlt />
        }
        else if (key === sortBy && sortType == -1) {
            return <biIcon.BiDownArrowAlt />
        }
        else {
            return <luIcon.LuArrowDownUp />
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
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort("name")}>Name {getIcon('name')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('status')}>Status{getIcon('status')}</th>
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
                                    {item.status === true ? <i style={{ color: "#07bc0c" }} className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000", }} ></i>}
                                </td>
                                <td className='fs-3'>
                                    <Link to={"/districtView/" + item._id}><i class="fa-regular fa-eye"></i></Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination pageChange={pageChange} pageCount={pageCount} cPage={cPage} setRecordPerPage={setRecPerPage} recordPerPage={recPerPage} />

        </div>
    )
}

export default District
