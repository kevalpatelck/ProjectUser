import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
      fullname: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setResponseMessage('');
      setResponseStatus(null);
  
      try {
          const response = await axios.post('https://cricket-box-booking.onrender.com/api/user/conatct', formData);  // Corrected typo in endpoint
  
          setResponseMessage(response.data.message || 'Message sent successfully!');  // set success message
          setResponseStatus(response.status);
  
          // Optionally reset the form after successful submission
          if (response.status === 200) {
              setFormData({
                  fullname: '',
                  email: '',
                  subject: '',
                  message: '',
              });
          }
      } catch (error) {
          console.error('Error submitting form:', error.response?.data || error.message);
          setResponseMessage(error.response?.data?.message || 'Failed to send message. Please try again.');
          setResponseStatus(error.response?.status || 500); // Internal Server Error
      } finally {
          setLoading(false);
      }
  };

    return (
        <div>
            <>
            <Header/>
                {/* ***** Header Area End ***** */}
                <div className="contact-page section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-heading">
                                    <h6>| Contact Us</h6>
                                    <h2>Get In Touch With Our Turf Owners</h2>
                                </div>
                                <p>
                                    For turf owners looking to expand their reach and maximize bookings, our platform offers the perfect solution. Get listed on our turf booking app and connect with sports enthusiasts searching for the best venues. Whether you manage a football, cricket, or multi-sport turf, we make it easy for you to manage schedules, attract more players, and increase revenue. Have questions or need assistance? Contact us today, and our dedicated support team will help you set up and optimize your turf listing for seamless bookings!
                                </p>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="item phone">
                                            <img
                                                src="assets/images/phone-icon.png"
                                                alt=""
                                                style={{ maxWidth: 52 }}
                                            />
                                            <h6>
                                                +91 12345-69870
                                                <br />
                                                <span>Phone Number</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="item email">
                                            <img
                                                src="assets/images/email-icon.png"
                                                alt=""
                                                style={{ maxWidth: 52 }}
                                            />
                                            <h6>
                                                kevalpatel.coderkube@gmail.com
                                                <br />
                                                <span>Business Email</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="name">Full Name</label>
                                                <input
     type="text"
     name="fullname" // Changed from 'name' to 'fullname'
     id="name"
     placeholder="Your Name..."
     autoComplete="on"
     required=""
     value={formData.fullname} // Changed from 'name' to 'fullname'
     onChange={handleChange}
 />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    pattern="[^ @]*@[^ @]*"
                                                    placeholder="Your E-mail..."
                                                    required=""
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="subject">Subject</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    placeholder="Subject..."
                                                    autoComplete="on"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label htmlFor="message">Message</label>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    placeholder="Your Message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <button
                                                    type="submit"
                                                    id="form-submit"
                                                    className="orange-button"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Sending...' : 'Send Message'}
                                                </button>
                                            </fieldset>
                                        </div>
                                        {responseMessage && (
                                            <div className="col-lg-12">
                                                <div
                                                    className={`alert ${responseStatus === 200 ? 'alert-success' : 'alert-danger'
                                                        }`}
                                                >
                                                    {responseMessage}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-12">
                                <div id="map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.003496002368!2d72.81324387503616!3d21.19202008049844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c2a4688790d%3A0xd5371b0166210725!2sCoderKube%20Technologies!5e0!3m2!1sen!2sin!4v1739362517912!5m2!1sen!2sin"
                                        width="100%"
                                        height="500px"
                                        frameBorder={0}
                                        style={{
                                            border: 0,
                                            borderRadius: 10,
                                            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)"
                                        }}
                                        allowFullScreen=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

export default Contact;