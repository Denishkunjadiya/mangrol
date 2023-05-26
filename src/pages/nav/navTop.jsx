import React from 'react'

const navTop = (props) => {

    const change = () => {
        props.side(!props.sidebar)
    }


    return (
        <nav className="mnb navbar navbar-default navbar-fixed-top">
            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'left', cursor: 'pointer' }}>
                <div style={{ padding: "15px 0", display: 'flex', width: '100%', alignItems: 'center' }}>

                    {props.sidebar ?
                        <a id="msbo" onClick={change}><i className="ic fa fa-bars"></i></a>
                        :
                        <a id="msbo" onClick={change}> <i class="fa-solid fa-xmark"></i></a>
                    }

                    <div id="navbar" className="navbar-collapse collapse" >
                        <img className='logo' src={require('../../assets/img/logo.png')} alt="Logo" />
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default navTop
