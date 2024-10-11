import { useEffect, useState } from "react";
import dayjs from "dayjs"; 
import { getUserVehicles, addVehicle, deleteVehicle } from "../services/vehicleService";
import { getUserBookings, deleteBooking, updateBooking } from "../services/bookingService";

const Dashboard = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicleFormData, setVehicleFormData] = useState({
    make: '',
    model: '',
    year: '',
  });
  const [bookingFormData, setBookingFormData] = useState({
    date: '',
    timeSlot: '',
  });

  // Fetch vehicles and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles = await getUserVehicles();
        const fetchedBookings = await getUserBookings();
        setVehicles(Array.isArray(fetchedVehicles) ? fetchedVehicles : []); // Ensure array
        setBookings(Array.isArray(fetchedBookings) ? fetchedBookings : []);  // Ensure array
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Handle vehicle form changes
  const handleVehicleChange = (e) => {
    setVehicleFormData({ ...vehicleFormData, [e.target.name]: e.target.value });
  };

  // Handle adding a new vehicle
  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await addVehicle(vehicleFormData);
      setVehicles([...vehicles, newVehicle]);
      setVehicleFormData({ make: '', model: '', year: '' });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle deleting a vehicle
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle booking form changes
  const handleBookingChange = (e, bookingId) => {
    setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
  };

  // Handle updating a booking
  const handleUpdateBooking = async (bookingId) => {
    try {
      await updateBooking(bookingId, bookingFormData);
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, ...bookingFormData } : booking
      );
      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle deleting a booking
  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      
      <section>
        <h2>Your Vehicles</h2>
        <ul>
          {Array.isArray(vehicles) && vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <li key={vehicle._id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
                <button onClick={() => handleDeleteVehicle(vehicle._id)}>Delete Vehicle</button>
              </li>
            ))
          ) : (
            <li>No vehicles found</li>
          )}
        </ul>

        <h3>Add a New Vehicle</h3>
        <form onSubmit={handleVehicleSubmit}>
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={vehicleFormData.make}
            onChange={handleVehicleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={vehicleFormData.model}
            onChange={handleVehicleChange}
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={vehicleFormData.year}
            onChange={handleVehicleChange}
          />
          <button type="submit">Add Vehicle</button>
        </form>
      </section>

      <section>
        <h2>Your Bookings</h2>
        <ul>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id}>
                Vehicle: {booking.vehicle.make} {booking.vehicle.model}<br />
                Service: {booking.service.name}<br />
                Date: {dayjs(booking.date).format('MMMM D, YYYY')}<br />
                Time Slot: {booking.timeSlot}
                <h4>Update Booking</h4>
                <form onSubmit={() => handleUpdateBooking(booking._id)}>
                  <input
                    type="date"
                    name="date"
                    value={dayjs(bookingFormData.date).format('YYYY-MM-DD')}
                    onChange={(e) => handleBookingChange(e, booking._id)}
                  />
                  <input
                    type="text"
                    name="timeSlot"
                    placeholder="Time Slot"
                    value={bookingFormData.timeSlot}
                    onChange={(e) => handleBookingChange(e, booking._id)}
                  />
                  <button type="submit">Update Booking</button>
                </form>
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete Booking</button>
              </li>
            ))
          ) : (
            <li>No bookings found</li>
          )}
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
