import React from "react";
import styles from "./styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Contact Information */}
        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Email: emir_han_ataman@hotmail.com</p>
          <p>Phone: +90 535 402 93 89</p>
          <p>Address: Ankara, Turkey</p>
        </div>

        {/* Google Maps Embed */}
        <div className={styles.map}>
          <h3>Our Location</h3>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58205.225963830606!2d32.75701537261732!3d39.94059857754322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1sen!2str!4v1744364355347!5m2!1sen!2str"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Social Media Links */}
        <div className={styles.social}>
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2025 Logic. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;