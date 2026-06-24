import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="contact container">
      <h1 className="contact-header">Contact Us</h1>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
            <div>
              <h3>Address</h3>
              <p>Shopping Street, Commerce City, Egypt</p>
            </div>
          </div>

          <div className="info-item">
            <i className="fas fa-phone" aria-hidden="true" />
            <div>
              <h3>Phone</h3>
              <p>+20 123 456 7890</p>
            </div>
          </div>

          <div className="info-item">
            <i className="fas fa-envelope" aria-hidden="true" />
            <div>
              <h3>Email</h3>
              <p>info@joostore.com</p>
            </div>
          </div>

          <div className="info-item">
            <i className="fas fa-clock" aria-hidden="true" />
            <div>
              <h3>Business Hours</h3>
              <p>Saturday - Thursday: 9 AM - 10 PM</p>
              <p>Friday: 1 PM - 10 PM</p>
            </div>
          </div>

          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f" aria-hidden="true" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter" aria-hidden="true" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true" />
              </a>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <i className="fab fa-whatsapp" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          {submitted ? (
            <div className="success-message" role="status">
              <i className="fas fa-check-circle" aria-hidden="true" />
              <h3>Message Sent!</h3>
              <p>Thank you for contacting us. We will get back to you soon.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="submit-btn">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
