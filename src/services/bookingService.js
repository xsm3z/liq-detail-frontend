const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

export const getUserBookings = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createBooking = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateBooking = async (bookingId, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteBooking = async (bookingId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};