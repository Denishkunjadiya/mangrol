import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../component/button'
import { useParams } from 'react-router-dom'
import { resetError, showError } from '../../services/error';


import * as faIcon from "react-icons/fa";
import moment from 'moment'


const EditMember = () => {
    const parms = useParams()
    const navigate = useNavigate()

    const [companyName, setCompanyName] = useState()
    const [representative, setRepresentative] = useState([{
        name: '',
        designation: ''
    }])
    const [zone, setZone] = useState()

    const [blockNo, setBlockNo] = useState()
    const [ploatNo, setPloatkNo] = useState()
    const [eState, setEState] = useState()
    const [gramPanchayat, setGramPanchayat] = useState()
    const [taluka, setTaluka] = useState()
    const [district, setDistrict] = useState()

    const [officeAddress, setOfficeAddress] = useState()
    const [mobileNo, setMobileNo] = useState()
    const [altMobileNo, setaltMobileNo] = useState()
    const [emailId, setEmailId] = useState()
    const [gstNo, setGstNo] = useState()
    const [businessTypes, setBusinessTypes] = useState()
    const [website, setWebsite] = useState()
    const [noOfMachine, setNoOfMachine] = useState()
    const [maleWorkers, setMaleWorkers] = useState()
    const [femaleWorkers, setFemaleWorkers] = useState()
    const [totalWorkers, settotalWorkers] = useState()
    const [powerSupply, setPowerSupply] = useState()
    const [remark, setRemark] = useState()
    const [renewalDate, setRenewalDate] = useState()

    const [districtsList, setDistrictList] = useState([])
    const [talukaList, setTalukaList] = useState([])
    const [zoneList, setZoneList] = useState([])
    const [businessTypeList, setBusinessTypeList] = useState([])
    const [powerSupplyList, setPowerSupplyList] = useState([])

    let [error, setError] = useState({})

    const cDate = new Date()
    const date = `${cDate.getFullYear()}-${cDate.getMonth() + 1}-${cDate.getDate()}`

    const editMember = async (e) => {
        e.preventDefault()

        const factoryAddress = {
            block_no: blockNo,
            plot_no: ploatNo,
            estate: eState,
            gram_panchayat: gramPanchayat,
            taluka: taluka,
            district: district
        }

        let data = {
            _id: parms.id,
            date,
            company_name: companyName,
            form_no: "form_no",
            representative: representative,
            zone: zone,
            factory_address: factoryAddress,
            office_address: officeAddress,
            mobile_no: mobileNo,
            alt_mobile_no: altMobileNo,
            email_id: emailId,
            website: website,
            gst_no: gstNo,
            business_types: businessTypes,
            no_of_machine: noOfMachine,
            male_workers: maleWorkers,
            female_workers: femaleWorkers,
            total_workers: totalWorkers,
            power_supply: powerSupply,
            remark: remark,
            renewal_date: renewalDate,
        }

        let result = await api('member/edit', data)
        console.log(result)

        if (result && result.status === 200) {
            navigate(`/memberView/${parms.id}`)
        }

    }

    // ----------- set data
    console.log(zone)
    const viewMember = async () => {
        let data = {
            _id: parms.id
        }
        let result = await api('member/view', data)
        if (result && result.status === 200) {
            setCompanyName(result?.data?.data?.company_name)
            setZone(result?.data?.data?.zone?._id)
            setBlockNo(result?.data?.data?.factory_address?.block_no)
            setPloatkNo(result?.data?.data?.factory_address?.plot_no)
            setEState(result?.data?.data?.factory_address?.estate)
            setGramPanchayat(result?.data?.data?.factory_address?.gram_panchayat)
            setTaluka(result?.data?.data?.factory_address?.taluka._id)
            setDistrict(result?.data?.data?.factory_address?.district._id)
            setOfficeAddress(result?.data?.data?.office_address)
            setMobileNo(result?.data?.data?.mobile_no)
            setaltMobileNo(result?.data?.data?.alt_mobile_no)
            setEmailId(result?.data?.data?.email_id)
            setGstNo(result?.data?.data?.gst_no)
            setBusinessTypes(result?.data?.data?.business_types?._id)
            setWebsite(result?.data?.data?.website)
            setNoOfMachine(result?.data?.data?.no_of_machine)
            setMaleWorkers(result?.data?.data?.male_workers)
            setFemaleWorkers(result?.data?.data?.female_workers)
            settotalWorkers(result?.data?.data?.total_workers)
            setPowerSupply(result?.data?.data?.power_supply?._id)
            setRemark(result?.data?.data?.remark)
            setRenewalDate(moment(result?.data?.data?.renewal_date).format('YYYY-MM-DD'))
            setRepresentative(result.data.data?.representative)

        }

    }

    // ---------------------- get data

    const dataList = async () => {

        let result = await api('member/')
        if (result && result.status === 200) {
            setDistrictList(result?.data?.master?.districts)
            setTalukaList(result?.data?.master?.talukas)
            setZoneList(result?.data?.master?.zones)
            setBusinessTypeList(result?.data?.master?.business_types)
            setPowerSupplyList(result?.data?.master?.power_supplys)
        }
    }
    // --------------------------

    useEffect(() => {
        dataList()
        viewMember()
    }, [])


    // ---------------------- Add represenative
    const addrepresentative = () => {
        setRepresentative([...representative, { name: "", designation: "", },]);
    };
    const removeInputFields = (index) => {
        const rows = [...representative];
        rows.splice(index, 1);
        setRepresentative(rows);
    };
    const handleChange = (index, e) => {
        const list = [...representative];
        list[index][e.target.name] = e.target.value;
        setRepresentative(list);
    };


    return (
        <div>
            <div className="row my-2  justify-content-end align-items-center">
                <div className="col-6">
                    <h2>Edit Member</h2>
                </div>

                <div className="col-6">
                    <Button icon={<i class="fa-solid fa-arrow-left"></i>} name='Back' link={'/memberView/' + parms.id} class='px-4 btn-primary float-end' />
                </div>
            </div>

            <form className='my-3 updateForm'>

                <div className="row  px-3 ">
                    <div className="col-md-6 ">
                        <label for="formGroupExampleInput" className="fs-4 mt-sm-2 mt-md-0 ">*Company Name</label>
                        <input id='companyName' value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Enter Member Name' type="text" />
                        {error?.name && <span className='error'>{error['CompanyName']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div className="d-flex justify-content-between  align-items-center ">
                        <h4 className='fw-medium'>*Representatives</h4>
                        <h3 className="mb-3 fw-bold">
                            <button type="button" onClick={addrepresentative} style={{ border: "none", float: "right", background: "none", color: "blue" }} >
                                {representative.length !== 3 ? <faIcon.FaPlusCircle /> : ''}
                            </button>
                        </h3>
                    </div>
                    {representative.map((data, index) => {
                        return (
                            <>
                                <div className="row d-flex align-items-center ">
                                    <div className="col-md-5 mb-3">
                                        <input type="text" onChange={(e) => handleChange(index, e)} value={data.name} name='name' id={`representative_${index}_name`} placeholder={`(${index + 1}) name`} />
                                    </div>
                                    <div className="col-md-5">
                                        <input type="text" onChange={(e) => handleChange(index, e)} value={data.designation} name='designation' id={`representative_${index}_designation`} placeholder="Designation" />
                                    </div>
                                    <div className="col-md-2 text-right fs-2">
                                        <button type="button" onClick={removeInputFields} style={{ border: "none", background: "none", color: "red" }} >
                                            <faIcon.FaMinusCircle />
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>


                <div className="row px-3 my-3 ">
                    <div className="col-md-6 ">

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">select Zone</label>
                            <select value={zone} onChange={(e) => setZone(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>---Select Zone----</option>
                                {zoneList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                </div>

                <div className="row px-3 my-3">
                    <h3>Factory Address</h3>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*block NO</label>
                        <input id='blockNo' onChange={(e) => setBlockNo(e.target.value)} value={blockNo} placeholder='Enter Block No' type="text" />
                        {error?.name && <span className='error'>{error['blockNo']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className="">Ploat No</label>
                        <input id='ploatNo' onChange={(e) => setPloatkNo(e.target.value)} value={ploatNo} placeholder='Enter Ploat No' type="text" />
                        {error?.name && <span className='error'>{error['ploatNo']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" ">eState</label>
                        <input id='eState' placeholder='Enter Estate' onChange={(e) => setEState(e.target.value)} value={eState} type="text" />
                        {error?.name && <span className='error'>{error['eState']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-4 col-sm-12 ">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*Gram Panchayat</label>
                        <input id='gramPanchayat' onChange={(e) => setGramPanchayat(e.target.value)} value={gramPanchayat} placeholder='Enter Gram Panchayat Name' type="text" />
                        {error?.name && <span className='error'>{error['gramPanchayat']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 ">

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">select Taluka</label>
                            <select onChange={(e) => setTaluka(e.target.value)} value={taluka} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>---Select Taluka----</option>
                                {talukaList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <div class="col-md-4 col-sm-12 ">

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">select District</label>
                            <select onChange={(e) => setDistrict(e.target.value)} value={district} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>---Select District----</option>
                                {districtsList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class=" col-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*Office Address</label>
                        <textarea id='officeAdd' onChange={(e) => setOfficeAddress(e.target.value)} value={officeAddress} placeholder='Enter Office Address' type="text" />
                        {error?.name && <span className='error'>{error['officeAdd']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-6 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*Mobile No</label>
                        <input id='mobileNo' onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} placeholder='Enter Mobile No' type="text" />
                        {error?.name && <span className='error'>{error['mobileNo']}</span>}
                    </div>
                    <div class="col-md-6 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*Alter Mobile No</label>
                        <input id='alterMobileNo' onChange={(e) => setaltMobileNo(e.target.value)} value={altMobileNo} placeholder='Enter Alter Mobile No' type="text" />
                        {error?.name && <span className='error'>{error['alterMobileNo']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">*Email Id</label>
                        <input id='emailId' onChange={(e) => setEmailId(e.target.value)} value={emailId} placeholder='Enter Email id' type="email" />
                        {error?.name && <span className='error'>{error['emailId']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className="">Website</label>
                        <input id='website' onChange={(e) => setWebsite(e.target.value)} value={website} placeholder='Enter Website' type="text" />
                        {error?.name && <span className='error'>{error['website']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" ">GST No</label>
                        <input id='GSTNo' placeholder='Enter GST NO' onChange={(e) => setGstNo(e.target.value)} value={gstNo} type="text" />
                        {error?.name && <span className='error'>{error['GSTNo']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-4 col-sm-12 my-3">

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">select Business Types</label>
                            <select onChange={(e) => setBusinessTypes(e.target.value)} value={businessTypes} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>---Select Business Types----</option>
                                {businessTypeList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <div class="col-md-4 col-sm-12 my-3">

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">select Power Supply</label>
                            <select onChange={(e) => setPowerSupply(e.target.value)} value={powerSupply} class="form-control" id="exampleFormControlSelect1">
                                <option selected disabled>---Select Power Supply----</option>
                                {powerSupplyList.map((item, i) => {
                                    return (
                                        <option key={i + 1} value={item._id}> {item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" ">No Of Machine</label>
                        <input id='noOfMachine' onChange={(e) => setNoOfMachine(e.target.value)} value={noOfMachine} placeholder='Enter No Of Machine' type="number" />
                        {error?.name && <span className='error'>{error['noOfMachine']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">Male Worker</label>
                        <input id='maleWorker' onChange={(e) => setMaleWorkers(e.target.value)} value={maleWorkers} placeholder='Male' type="number" />
                        {error?.name && <span className='error'>{error['maleWorker']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className="">Female Worker</label>
                        <input id='female' placeholder='Female' type="number" onChange={(e) => setFemaleWorkers(e.target.value)} value={femaleWorkers} />
                        {error?.name && <span className='error'>{error['female']}</span>}
                    </div>
                    <div class="col-md-4 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" ">Total Worker</label>
                        <input id='totalWorker' placeholder='Total Worker' type="number" onChange={(e) => settotalWorkers(e.target.value)} value={totalWorkers} />
                        {error?.name && <span className='error'>{error['totalWorker']}</span>}
                    </div>
                </div>

                <div className="row px-3 my-3">
                    <div class="col-md-6 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className=" mt-sm-4 mt-md-0">Remark</label>
                        <input id='remark' placeholder='Remark' type="text" onChange={(e) => setRemark(e.target.value)} value={remark} />
                        {error?.name && <span className='error'>{error['remark']}</span>}
                    </div>
                    <div class="col-md-6 col-sm-12 my-3">
                        <label for="formGroupExampleInput" className="">Renewal Date</label>
                        <input id='renewalDate' placeholder='Renewal Date' type="date" onChange={(e) => setRenewalDate(e.target.value)} value={renewalDate} />
                        {error?.name && <span className='error'>{error['renewalDate']}</span>}
                    </div>
                </div>


                <div className="row  px-3 ">
                    <div className="col-md-6 my-3">
                        <button style={{ letterSpacing: '2px' }} className='btn btn-primary' onClick={editMember} >
                            Edit
                        </button>
                        <Link to={"/memberView/" + parms.id}>
                            <button style={{ letterSpacing: '2px' }} className=' btn mx-3 btn-light' onClick={oncancel} >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default EditMember
