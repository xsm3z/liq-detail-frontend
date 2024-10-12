import "./Landing.css";

const Landing = () => {
  return (
    <main className="landing-main-container">
      <section className="landing-hero-section">
        <div>
          <h1>Welcome to Liq.Detail</h1>
          <p>
            At Liq.Detail, we specialize in premium detailing services to keep
            your vehicle looking and feeling brand new. Whether it's a
            maintenance wash or a full paint correction, we've got you covered.
          </p>
        </div>
      </section>

      <section className="landing-services-section">
        <div className="landing-services-container">
          <div className="landing-service-box">
            <h3>Exterior Detailing</h3>
            <p>
              Bring back the shine and protect your car's paint with our
              exterior detailing services.
            </p>
          </div>
          <div className="landing-service-box">
            <h3>Interior Detailing</h3>
            <p>
              Keep your car’s interior fresh, clean, and protected with our deep
              cleaning packages.
            </p>
          </div>
          <div className="landing-service-box">
            <h3>Ceramic Coating</h3>
            <p>
              Ensure long-lasting protection with ceramic coating for your
              vehicle.
            </p>
          </div>
        </div>

        <div className="landing-coming-soon">
          <h3>Coming Soon</h3>
          <ul className="coming-soon-list">
            <li>Tint Installation</li>
            <li>Paint Protection Film (PPF)</li>
            <li>Vinyl Wrap Installations</li>
          </ul>
        </div>
      </section>

      <footer className="landing-footer">
        <p>For more information, contact us at info@liqdetail.com.</p>
      </footer>
    </main>
  );
};

export default Landing;
