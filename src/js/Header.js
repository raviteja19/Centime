import React,{useEffect,useState} from 'react'


function Header()
{

    return (
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" id="buttoniconnvarbar" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" onClick={(e)=>showSideBar(e)}>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <div className="navbar-brand applicationname" >
                            <img src="src/images/logo.png" style={{height:'25px',width:'150px'}}/>
                        </div>
                       
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;