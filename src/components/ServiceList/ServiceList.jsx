import { useEffect, useState } from "react";
import { getServices } from "../../services/serviceService";
import { getUserVehicles } from "../../services/vehicleService";
import { createBooking } from "../../services/bookingService";
import dayjs from "dayjs";
import "./ServiceList.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [timeSlot, setTimeSlot] = useState("9:00 AM");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showFormServiceId, setShowFormServiceId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServices = await getServices();
        const fetchedVehicles = await getUserVehicles();
        setServices(Array.isArray(fetchedServices) ? fetchedServices : Object.values(fetchedServices));
        setVehicles(Array.isArray(fetchedVehicles) ? fetchedVehicles : []);
        setSelectedVehicle(fetchedVehicles.length > 0 ? fetchedVehicles[0]._id : "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleBookService = async (serviceId) => {
    if (!selectedVehicle) {
      setMessage({ type: "error", text: "Please select a vehicle before booking." });
      return;
    }

    const bookingData = {
      vehicleId: selectedVehicle,
      serviceId,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      timeSlot,
    };

    try {
      await createBooking(bookingData);
      setMessage({ type: "success", text: "Service booked successfully!" });
      setShowFormServiceId(null); 
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: "Error booking the service." });
    }
  };

  return (
    <main className="services-container">
      <h2>Available Services</h2>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <ul className="services-list">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <li key={service._id} className="services-item">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Price: ${service.price}</p>

              {showFormServiceId === service._id ? (
                <div className="booking-form">
                  <label>Select Vehicle: </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.make} {vehicle.model} ({vehicle.year})
                      </option>
                    ))}
                  </select>

                  <label>Select Booking Date: </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <label>Select Time Slot: </label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  />
                  <button onClick={() => handleBookService(service._id)} className="book-btn">
                    Book
                  </button>
                  <button onClick={() => setShowFormServiceId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowFormServiceId(service._id)} className="select-service-btn">
                  Select Service
                </button>
              )}
            </li>
          ))
        ) : (
          <li>No services found</li>
        )}
      </ul>
    </main>
  );
};

export default Services;
