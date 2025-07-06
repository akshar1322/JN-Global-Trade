"use client";

import { versions } from "@/data/version";
import { useState } from "react";
import styled from "styled-components";

const Footer = () => {
  const latestVersion = versions[versions.length - 1];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSubmitted(true);
          form.reset();
        } else {
          alert("Submission failed.");
        }
      })
      .catch(() => alert("Network error"));
  };

  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Navigation */}
        <div>
          <ul className="space-y-2">
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Gift Card</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Locations</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <ul className="space-y-2">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Accessibility Statement</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 text-sm">
          <p>Nilambag Road NR Bahumali Bhawan</p>
          <p>Thenewjahangir Vakil Mill Compound,</p>
          <p>Bhavnagar, Gujarat - 364001</p>
          <p><a href="mailto:jnglobaltrade1975@gmail.com">jnglobaltrade1975@gmail.com</a></p>
          <p><a href="tel:+917359709631">+91 73597 09631</a></p>
        </div>

        {/* Newsletter */}
        <StyledWrapper>
          <h3 className="text-xl font-semibold mb-2">Get on the list</h3>
          <p className="mb-4 text-sm">New arrivals, exclusive sales, and much more</p>

          {submitted ? (
            <p className="text-green-400">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
              />
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  autoComplete="email"
                />
                <label htmlFor="email" className="label">
                  Enter your Email
                </label>
                <div className="underline" />
              </div>
              <label className="flex items-center space-x-2 mb-4 text-sm">
                <input type="checkbox" required />
                <span>Yes, subscribe me to your newsletter.</span>
              </label>
              <button type="submit" className="w-full border rounded py-2">
                Submit
              </button>
            </form>
          )}
        </StyledWrapper>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-12 border-t border-white pt-6 text-sm max-w-7xl mx-auto">
        <div className="text-7xl font-serif italic">Jn Global</div>

        <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Pinterest</a>
        </div>

        <div className="mt-4 md:mt-0 text-ms text-right uppercase">
          <p>© 2035 by JN GLOBAL TRADED</p>
          <p>
            {latestVersion.newVersion} • developed by{" "}
            <a
              href="https://splitxcom.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline transition"
            >
              SPLITX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const StyledWrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .input-container {
    position: relative;
    margin: 16px 0;
    width: 100%;
  }

  .input-container input[type="email"] {
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 8px 0;
    background-color: transparent;
    color: white;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #ccc;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input[type="email"]:focus ~ .label,
  .input-container input[type="email"]:valid ~ .label {
    top: -20px;
    font-size: 14px;
    color: white;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: white;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input[type="email"]:focus ~ .underline,
  .input-container input[type="email"]:valid ~ .underline {
    transform: scaleX(1);
  }

  button {
    background-color: white;
    color: black;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #ddd;
  }
`;

export default Footer;
