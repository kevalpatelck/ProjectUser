import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Properties() {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const turfsPerPage = 6;

  useEffect(() => {
    fetchTurfs();
    
  }, []);
  

  const fetchTurfs = async () => {
    try {
      const response = await axios.get("https://cricket-box-booking.onrender.com/api/user/getallturfs");
      if (Array.isArray(response.data)) {
        setTurfs(response.data);
      } else if (Array.isArray(response.data.turfs)) {
        setTurfs(response.data.turfs);
      } else {
        console.error("Unexpected API response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
    }
  };

  const filteredTurfs = turfs.filter((turf) =>
    turf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  const currentTurfs = filteredTurfs.slice(indexOfFirstTurf, indexOfLastTurf);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    <div className="container">
      <Header />
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a turf..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button1}>Search</button>
      </div>
      <div className="row properties-box" style={{ padding: "10px" }}>
        
        {currentTurfs.length > 0 ? (
          currentTurfs.map((turf) => (
            <div key={turf._id} className="col-lg-4 col-md-6 properties-item" style={{ padding: "20px" }}>
              
              <div className="item" style={styles.card}>
                
              <span className="category">{turf.name}</span>
              <br/>
              <div className="image-slider">
                <Slider {...sliderSettings}>
                  {turf?.images?.map((image, index) => (
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
              <br/>

                {/* <h4>{turf.name}</h4> */}
                <ul>
                {/* <li>Location: Lat {turf.location.lat}, Lng {turf.location.lng}</li> */}
                <li>Address:<span> {turf.address1} {turf.address2 ? `, ${turf.address2}` : ""}</span></li>
                <li>City:<span> {turf.city}</span></li>
                <li>Landmark:<span> {turf.landmark}</span></li>
                <li>Zip Code: <span>{turf.zipcode}</span></li>
                </ul>

                <div className="slots">
                  <h5>Available Slots:</h5>
                  {turf.timeSlots.map((slot, index) => (
                    <p key={index}> {slot.startTime} - {slot.endTime} (₹{slot.price})</p>
                  ))}
                  
                </div>
                <div className="main-button">
                  <button>
                    <Link to={`/properties/${turf._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No turfs found.</p>
        )}
      </div>
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredTurfs.length / turfsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={currentPage === index + 1 ? styles.activePageButton : styles.pageButton}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  searchContainer: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  input: { width: "300px", padding: "10px", fontSize: "16px", border: "2px solid #ddd", borderRadius: "6px" },
  button1: { backgroundColor: "#007bff", color: "white", padding: "10px 16px", borderRadius: "6px", cursor: "pointer" },
  card: { textAlign: "center", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", maxWidth: "280px", margin: "auto" },
  // image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" },
  pagination: { display: "flex", justifyContent: "center", marginTop: "20px" },
  pageButton: { backgroundColor: "#f1f1f1", border: "1px solid #ddd", padding: "8px 12px", margin: "0 5px", cursor: "pointer", borderRadius: "4px" },
  activePageButton: { backgroundColor: "#007bff", color: "white", borderRadius: "4px" },
  noResults: { textAlign: "center", color: "#888", fontSize: "18px", marginTop: "20px" },
  //  hoverImage: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px", transition: "opacity 0.3s ease-in-out"}
};
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

export default Properties;
