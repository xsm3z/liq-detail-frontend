import { useEffect, useState } from "react";
import { getUserVehicles, addVehicle, deleteVehicle } from "../../services/vehicleService";
import { getUserBookings, deleteBooking, updateBooking } from "../../services/bookingService";
import dayjs from "dayjs";
import "./Dashboard.css"; 

const Dashboard = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicleFormData, setVehicleFormData] = useState({
    make: "",
    model: "",
    year: "",
  });
  const [bookingFormData, setBookingFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    timeSlot: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles = await getUserVehicles();
        const fetchedBookings = await getUserBookings();
        setVehicles(fetchedVehicles);
        setBookings(fetchedBookings);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleFormData({ ...vehicleFormData, [e.target.name]: e.target.value });
  };

  const handleBookingChange = (e) => {
    setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await addVehicle(vehicleFormData);
      setVehicles([...vehicles, newVehicle]);
      setVehicleFormData({ make: "", model: "", year: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBooking = async (bookingId) => {
    try {
      await updateBooking(bookingId, bookingFormData);
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, ...bookingFormData } : booking
      );
      setBookings(updatedBookings);
      setEditingBooking(null);
      setBookingFormData({ date: dayjs().format("YYYY-MM-DD"), timeSlot: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
      const updatedBookings = bookings.filter(
        (booking) => booking.vehicle._id !== vehicleId
      );
      setBookings(updatedBookings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">{user.username}'s Dashboard</h1>

      <section className="dashboard-section">
        <h2 className="section-title">Vehicles</h2>
        <ul className="vehicles-list">
          {Array.isArray(vehicles) && vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <li key={vehicle._id} className="vehicle-item">
                <p>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </p>
                <button
                  onClick={() => handleDeleteVehicle(vehicle._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No vehicles found</p>
          )}
        </ul>
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-vehicle-btn"
        >
          {showForm ? "-" : "+"}
        </button>

        {showForm && (
          <form onSubmit={handleVehicleSubmit} className="vehicle-form">
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={vehicleFormData.make}
              onChange={handleVehicleChange}
              className="form-input"
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={vehicleFormData.model}
              onChange={handleVehicleChange}
              className="form-input"
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={vehicleFormData.year}
              onChange={handleVehicleChange}
              className="form-input"
            />
            <button type="submit" className="submit-btn">
              Add Vehicle
            </button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Bookings</h2>
        <ul className="bookings-list">
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id} className="booking-item">
                <div className="booking-info">
                  <p>
                    Vehicle: {booking.vehicle.make} {booking.vehicle.model}
                    <br />
                    Service: {booking.service.name}
                    <br />
                    Date: {dayjs(booking.date).format("DD/MM/YYYY")}
                    <br />
                    Time Slot: {booking.timeSlot}
                  </p>
                </div>
                <div className="booking-buttons">
                  {editingBooking === booking._id ? (
                    <div>
                      <input
                        type="date"
                        name="date"
                        value={bookingFormData.date}
                        onChange={handleBookingChange}
                        className="form-input"
                      />
                      <input
                        type="text"
                        name="timeSlot"
                        value={bookingFormData.timeSlot}
                        onChange={handleBookingChange}
                        className="form-input"
                      />
                      <button
                        onClick={() => handleUpdateBooking(booking._id)}
                        className="booking-update"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setEditingBooking(null)}
                        className="booking-update"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingBooking(booking._id)}
                        className="booking-update"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="booking-delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
