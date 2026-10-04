import React from 'react';
import './Web-css/Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>Get in touch with us for any queries or support.</p>
      <form>
        <label>Name</label>
        <input type="text" />
        <label>Email</label>
        <input type="email" />
        <label>Message</label>
        <textarea></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
