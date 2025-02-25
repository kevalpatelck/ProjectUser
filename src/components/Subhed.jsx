import React from 'react'
import { Link } from 'react-router-dom'

function Subhed() {
  return (
    <div>
      <>
<div className="sub-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <ul className="info">
                  <li>
                    <i className="fa fa-envelope" /> kevalpatel.coderkube@gmail.com
                  </li>
                  <li>
                    <i className="fa fa-map" /> Nanpura, floar 5 num 501 
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-4">
                <ul className="social-links">
                  <li>
                    <Link to="#">
                      <i className="fab fa-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://x.com/Iamkruze" target="_blank">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.linkedin.com/in/keval-patel-29417a32a/">
                      <i className="fab fa-linkedin" />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com/_kevall_13/">
                      <i className="fab fa-instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
</>
    </div>
  )
}

export default Subhed
