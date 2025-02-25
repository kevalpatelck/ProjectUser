import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false)

  // Toggle modal visibility
  const handleModalToggle = () => {
    setShowModal(!showModal)
  }

  return (
    <div>
      <>
   
        {/* ***** Header Area Start ***** */}
        <header className="header-area header-sticky">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="main-nav">
                  {/* ***** Logo Start ***** */}
                  <Link to="/" style={{alignItems:"center", marginTop:"20px"}}>
                    <h1>BookMyTurf</h1>
                  </Link>
                  {/* ***** Logo End ***** */}
                  {/* ***** Menu Start ***** */}
                  <ul className="nav">
                    <li>
                      <Link to="/" className="active">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties">Turfs</Link>
                    </li>
                    {/* <li>
                      <Link to="/singleproperty">Turf Details</Link>
                    </li> */}
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    {/* <li>
                      <Link to="/login">Log in</Link>
                    </li>
                    <li>
                      <Link to="/register">SignUp</Link>
                    </li> */}
                    <li>
                      <Link to="#" onClick={handleModalToggle}>
                        <i className="fa fa-calendar" /> Registered as owner
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="#" onClick={handleModalToggle}>
                        <i className="fa fa-calendar" /> Registered as owner
                      </Link>
                    </li> */}
                  </ul>
                  <Link className="menu-trigger">
                    <span>Menu</span>
                  </Link>
                  {/* ***** Menu End ***** */}
                </nav>
              </div>
            </div>
          </div>
        </header>
        {/* ***** Modal for Registered as Owner ***** */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Owner Login</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalToggle}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="ownerEmail">Email address</label>
                      <input type="email" className="form-control" id="ownerEmail" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ownerPassword">Password</label>
                      <input type="password" className="form-control" id="ownerPassword" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default Header
