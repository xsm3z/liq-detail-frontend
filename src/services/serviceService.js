const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getServices = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/services`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createService = async (serviceData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(serviceData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateService = async (serviceId, updatedData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const toggleServiceActive = async (serviceId, isActive) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ isActive: !isActive }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getServices, createService, updateService, toggleServiceActive };
