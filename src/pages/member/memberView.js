import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../component/button'
import moment from 'moment/moment'

const MemberView = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [member, setMember] = useState()
    const [representative, setRepresentative] = useState([])

    const viewMember = async () => {
        let data = {
            _id: params.id
        }
        let result = await api('member/view', data)
        if (result && result.status === 200) {
            setMember(result?.data?.data)
            setRepresentative(result?.data?.data?.representative)
        }

    }
    // ----------------- delete

    const deleteMember = async () => {
        const data = {
            _id: params.id
        }
        let result = await api(`member/delete`, data)
        if (result && result.status === 200) {
            console.log("data deletad successfully")
            navigate('/member')
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        viewMember()
    }, [])

    return (
        <>
            <div className="admin_page_top">
                <h2>View Member</h2>
                <div>
                    <Button link='/member' iHeight='15px' class='btn-primary mx-3' icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' />
                    <Button link={`/editMember/${params.id}`} iHeight='15px' class='btn-primary' icon={<i class="fa-solid fa-pen-to-square text-light"></i>} name='Update' />
                </div>
            </div>

            <div className="row mx-2">
                <div className="col-12 my-sm-3">
                    <p> <span className='fw-semibold h4'> Date : </span> <span className='h4 fw-light'> {moment(member?.date).format('DD-MM-YYYY')}</span> </p>
                    <p> <span className='fw-semibold h4'>Form No. : </span> <span className='h4 fw-light'>1 { }</span></p>
                    <p> <span className='fw-semibold h4'>Membership No. : </span> <span className='h4 fw-light'>{member?.membership_no} </span></p>
                    <p> <span className='fw-semibold h4'>Company Name : </span> <span className='h4 fw-light'>{member?.company_name} </span></p>
                    <p> <span className='fw-semibold h4'>Zone : </span> <span className='h4 fw-light'>{member?.zone?.name} </span></p>
                    <p> <span className='fw-semibold h4'>Office Address : </span> <span className='h4 fw-light'>{member?.office_address} </span></p>
                    <p> <span className='fw-semibold h4'>Mobile-no : </span> <span className='h4 fw-light'>{member?.mobile_no} </span></p>
                    <p> <span className='fw-semibold h4'>Alter Mobile No. : </span> <span className='h4 fw-light'> {member?.alt_mobile_no}</span></p>
                    <p> <span className='fw-semibold h4'>Email ID : </span> <span className='h4 fw-light'> {member?.email_id}</span></p>
                    <p> <span className='fw-semibold h4'>Website : </span> <span className='h4 fw-light'>{member?.website}</span></p>
                    <p> <span className='fw-semibold h4'>GST No. : </span> <span className='h4 fw-light'>{member?.gst_no}</span></p>
                    <p> <span className='fw-semibold h4'>Business Type : </span> <span className='h4 fw-light'>{member?.business_types?.name}</span></p>
                    <p> <span className='fw-semibold h4'>No. of Machine : </span> <span className='h4 fw-light'>{member?.no_of_machine}</span></p>
                    <p> <span className='fw-semibold h4'>Male Worker : </span> <span className='h4 fw-light'>{member?.male_workers}</span></p>
                    <p> <span className='fw-semibold h4'>Female Worker : </span> <span className='h4 fw-light'>{member?.female_workers}</span></p>
                </div>
                <div className=" col-12 my-sm-3">
                    <h3 className='fw-bold'> Representative</h3>
                    {representative.map((item) => {
                        return (<>
                            <p><span className='fw-semibold h4'>Name : </span> <span className='h4 fw-light'>{item.name}</span></p>
                            <p className='mb-4'><span className='fw-semibold h4'>Designation : </span><span className='h4 fw-light'>{item.designation}</span></p>
                        </>)
                    })}


                </div>
                <div className="col-12">
                    <h3 className='fw-bold'> Factory Address</h3>
                    <p><span className='fw-semibold h4'>Block No. : </span> <span className='h4 fw-light'>{member?.factory_address?.block_no}</span> </p>
                    <p><span className='fw-semibold h4'>Ploat No : </span> <span className='h4 fw-light'>{member?.factory_address?.plot_no}</span> </p>
                    <p><span className='fw-semibold h4'>Estate : </span> <span className='h4 fw-light'>{member?.factory_address?.estate}</span> </p>
                    <p><span className='fw-semibold h4'>Gram Panchayat : </span> <span className='h4 fw-light'>{member?.factory_address?.gram_panchayat}</span> </p>
                    <p><span className='fw-semibold h4'>Taluka : </span> <span className='h4 fw-light'>{member?.factory_address?.taluka?.name}</span> </p>
                    <p><span className='fw-semibold h4'>District : </span> <span className='h4 fw-light'>{member?.factory_address?.district?.name}</span> </p>
                </div>
            </div>

            <div className=' bottom-0 w-100 ' onClick={deleteMember}>
                <button className='btn btn-light'><i class="mx-3 fa-solid fa-trash"></i>Delete</button>
            </div>
        </>
    )
}

export default MemberView
