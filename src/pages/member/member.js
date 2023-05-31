import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'
import Button from '../../component/button'
import Pagination from '../../component/pagination'

import * as luIcon from "react-icons/lu";
import * as biIcon from "react-icons/bi";
import moment from 'moment/moment'

const Member = () => {
    let quePar = new URLSearchParams(window.location.search);
    let param = quePar.get('page_no')
    let iniPage = parseInt(param)

    const [tRecord, setTRecord] = useState(0)
    let [recPerPage, setRecPerPage] = useState(5)
    const [cPage, setCpage] = useState(!iniPage ? iniPage : 1)

    let pageCount = Math.ceil(tRecord / recPerPage)

    const [member, setMember] = useState([])
    let [sortBy, setSortBy] = useState('')
    let [sortType, setSortType] = useState(-1)

    let [status, setStatus] = useState('')


    const showMember = async (pageNo) => {

        let data = {
            skip_number: (pageNo - 1) * recPerPage,
            record_per_page: recPerPage,
            sort_by: sortBy,
            sort_type: sortType,
            status: status
        }

        let result = await api('member/', data)
        if (result && result.status === 200) {
            if (result?.data?.total_records) {
                setTRecord(result?.data?.total_records)
            }
            setMember(result?.data?.data)
        }
    }
    useEffect(() => {
        setCpage(cPage)
        showMember(!param ? param : 1)
    }, [recPerPage])

    // ----------------- page Change

    const pageChange = async (page) => {
        let cPage = page.selected + 1;
        showMember(cPage)
        window.history.replaceState({}, '', window.location.pathname + '?page_no=' + cPage)
    }

    // ----------- status


    const handleStatus = async (item) => {
        setStatus(item.status)

        const data = {
            _id: item._id,
            status: (!item.status)
        }
        const result = await api('member/status', data)

        if (result && result.status === 200) {
            showMember()
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
        showMember()
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
            <div className="admin_page_top " >
                <h2>Member</h2>
                <Button link='/addMember' iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-plus"></i>} name='Add' />
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort("company_name")}>company Name {getIcon('company_name')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('membership_no')}>Membership No{getIcon('membership_no')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('mobile_no')}>Mobile No{getIcon('mobile_no')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('business_types')}>Business Types{getIcon('business_types')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('renewal_date')}>Renewal Date{getIcon('renewal_date')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('factory_address.taluka')}>Taluka{getIcon('factory_address.taluka')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('factory_address.district')}>District{getIcon('factory_address.district')}</th>
                        <th style={{ cursor: "pointer", userSelect: 'none' }} onClick={() => sort('status')}>Status{getIcon('status')}</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {member.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.company_name}</td>
                                <td>{item.membership_no}</td>
                                <td>{item.mobile_no}</td>
                                <td>{item.business_types.name}</td>
                                <td>{moment(item.renewal_date).format('DD-MM-YYYY')}</td>
                                <td>{item.factory_address.taluka.name}</td>
                                <td>{item.factory_address.district.name}</td>
                                <td style={{ cursor: "pointer" }} className='fs-3' onClick={() => handleStatus(item)}>
                                    {item.status === true ? <i style={{ color: "#07bc0c" }} className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0000", }} ></i>}
                                </td>
                                <td className='fs-3'>
                                    <Link to={`/memberView/${item._id}`}><i class="fa-regular fa-eye"></i></Link>
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

export default Member
