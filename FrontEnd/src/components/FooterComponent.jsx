import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-2 footer shadow-sm">
      <div className="container text-center">
        <p className="mb-1">
          © {new Date().getFullYear()} All rights reserved by{" "}
          <a
            href="https://msntetratech.netlify.app"
            className="text-info text-decoration-none fw-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            DataList
          </a>
        </p>
        <p className="mb-0  text-white" style={{ fontSize: "0.9rem" }}>
          Developed by <strong>Srenethesh</strong>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
