import './Landing.css';

const Landing = () => {
  return (
    <main className="main-container">
      <section className="hero-section">
        <div>
          <h1>Welcome to Liq.Detail</h1>
          <h2>Your Car, Our Passion</h2>
          <p>
            At Liq.Detail, we specialize in premium detailing services to keep
            your vehicle looking and feeling brand new. Whether it's a maintenance
            wash or a full paint correction, we've got you covered.
          </p>
        </div>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-box">
            <h3>Exterior Detailing</h3>
            <p>
              Bring back the shine and protect your car's paint with our
              exterior detailing services.
            </p>
          </div>
          <div className="service-box">
            <h3>Interior Detailing</h3>
            <p>
              Keep your car’s interior fresh, clean, and protected with our deep
              cleaning packages.
            </p>
          </div>
          <div className="service-box">
            <h3>Ceramic Coating</h3>
            <p>
              Ensure long-lasting protection with ceramic coating for your
              vehicle.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          For more information, feel free to contact us at info@liqdetail.com.
        </p>
      </footer>
    </main>
  );
};

export default Landing;
