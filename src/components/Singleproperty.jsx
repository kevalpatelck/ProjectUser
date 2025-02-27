import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";

function SingleProperty() {
  const { id } = useParams();
  const [turf, setTurf] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]); // Store selected slots in an array
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    fetchTurfDetails();
  }, [fetchTurfDetails]);
  

  const fetchTurfDetails = async () => {
    try {
      const response = await axios.get(
        `https://cricket-box-booking.onrender.com/api/user/turfs/${id}`
      );
      console.log("Fetched Turf Data:", response.data.turf);
      setTurf(response.data.turf);
    } catch (error) {
      console.error("Error fetching turf details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map((option) =>
      JSON.parse(option.value)
    );
    setSelectedSlots(selectedValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.");
      return;
    }

    try {
      const bookingData = {
        turfId: id,
        userDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        bookingDetails: {
          date: formData.date,
          timeSlots: selectedSlots, // Send slots as an array
        },
      };

      console.log("Sending Booking Data:", bookingData);

      const response = await axios.post(
        "https://cricket-box-booking.onrender.com/api/user/booking",
        bookingData
      );

      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error booking turf:",
        error.response?.data || error.message
      );
      alert(
        `Booking failed: ${
          error.response?.data?.message || "Please try again."
        }`
      );
    }
  };

  if (!turf) {
    return <p>Loading...</p>;
  }

  // React Slick settings for the image slideshow
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Header />
      <div className="single-property section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>{turf.name}</h2>
            
              {/* Image Slideshow */}
              <div className="image-slider">
                <Slider {...sliderSettings}>
                  {turf.images?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`https://cricket-box-booking.onrender.com/${image}`}
                        alt={`Turf ${index}`}
                        className="turf-slider-image"
                      />
                    </div>
                  ))}
                </Slider>

              </div>

              <p>
                <strong>Full Address :</strong> {turf.address1}, {turf.address2},{" "}
                {turf.city}, {turf.landmark}, {turf.zipCode}
              </p>
              <p>
                <strong>Coordinates:</strong> Lat: {turf.location.lat}, Lng: {turf.location.lng}
              </p>
              <p><strong>City :  </strong>  {turf.city}</p>
              <p><strong>First Adress :</strong> {turf.address1} </p>
              <p><strong>Second Adress :</strong> {turf.address2}</p>
              <p><strong>Zip Code :</strong> {turf.zipcode}</p>

              {/* <p>
                <strong>Available Slots:</strong>
              </p> */}
              <ul>
                {turf.slots?.map((slot, index) => (
                  <li key={index}>
                    <strong>Start:</strong> {slot.startTime} |{" "}
                    <strong>End:</strong> {slot.endTime} |
                    <strong style={{ fontSize: "18px", color: "red" }}>
                      {" "}
                      ₹{slot.price}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-4">
              <div className="booking-form p-4 border rounded bg-light">
                <h4>Book This Turf</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      title="Phone number must be exactly 10 digits"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Select Time Slots</label>
                    <select
                      className="form-control"
                      name="slot"
                      multiple
                      onChange={handleSlotChange}
                      required
                    >
                      {turf.timeSlots?.map((slot) => (
                        <option key={slot._id} value={JSON.stringify(slot)}>
                          {slot.startTime} - {slot.endTime} | ₹{slot.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* {selectedSlots.length > 0 && (
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      Total Price: ₹
                      {selectedSlots.reduce((total, slot) => total + slot.price, 0)}
                    </p>
                  )} */}
{selectedSlots.length > 0 && (
  <p
    style={{
      fontSize: "18px",
      fontWeight: "bold",
      color: "red",
    }}
  >
    Total Price: ₹
    {selectedSlots.reduce((total, slot) => total + parseFloat(slot.price), 0)}
  </p>
)}
<div className="mb-3">
                      <label className="form-label">Booking Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Book Now
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Additional Styles */}
      <style jsx>{`
        .image-slider {
          width: 100%;
          margin: 20px 0;
        }

        .turf-slider-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 10px;
        }
        .
      `}</style>
    </>
  );
}

export default SingleProperty;
