import React from 'react'

const Dashboard = () => {
    return (
        <>
            <div className="container-fluid py-5 Count_container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box ">
                        <p className="text-left ">district</p>
                        <span className="span text-center">10</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">taluka</p>
                        <span className="span text-center">50</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">zone</p>
                        <span className="span text-center">50</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">businessType</p>
                        <span className="span text-center">100</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">powerSupply</p>
                        <span className="span text-center">5</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">association</p>
                        <span className="span text-center">5</span>
                    </div>
                    <div className="col-lg-3 col-md-5 text-capitalize overflow-hidden py-3 m-3 box">
                        <p className="text-left ">member</p>
                        <span className="span text-center">5</span>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard
