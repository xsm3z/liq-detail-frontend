import { useEffect, useState } from "react";
import { getUserVehicles, addVehicle, deleteVehicle } from "../services/vehicleService";
import { getUserBookings, deleteBooking } from "../services/bookingService";

const Dashboard = ({ user }) => {
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicleFormData, setVehicleFormData] = useState({
    make: '',
    model: '',
    year: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVehicles = await getUserVehicles();
        const fetchedBookings = await getUserBookings();
        setVehicles(fetchedVehicles);
        setBookings(fetchedBookings);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleVehicleChange = (e) => {
    setVehicleFormData({ ...vehicleFormData, [e.target.name]: e.target.value });
  };

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

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await deleteVehicle(vehicleId);

      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));

      const updatedBookings = bookings.filter((booking) => booking.vehicle._id !== vehicleId);
      setBookings(updatedBookings);
    } catch (err) {
      console.log(err);
    }
  };

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
          {vehicles.map((vehicle) => (
            <li key={vehicle._id}>
              <p>{vehicle.make} {vehicle.model} ({vehicle.year})</p>
              <button onClick={() => handleDeleteVehicle(vehicle._id)}>Delete Vehicle</button>
            </li>
          ))}
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
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>
                Vehicle: {booking.vehicle.make} {booking.vehicle.model}<br />
                Service: {booking.service.name}<br />
                Date: {booking.date}<br />
                Time Slot: {booking.timeSlot}
              </p>
              <button onClick={() => handleDeleteBooking(booking._id)}>Delete Booking</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
