const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUserVehicles = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/vehicles`, {
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

const addVehicle = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/vehicles`, {
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

const deleteVehicle = async (vehicleId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/vehicles/${vehicleId}`, {
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

export {getUserVehicles, addVehicle, deleteVehicle}