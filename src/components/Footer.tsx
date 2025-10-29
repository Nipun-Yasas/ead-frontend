import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About AutoCare Pro */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              About AutoCare Pro
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Leading automobile service management platform providing
              excellence in vehicle care since 2020.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/services/maintenance"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Regular Maintenance
                </a>
              </li>
              <li>
                <a
                  href="/services/repairs"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Repairs & Diagnostics
                </a>
              </li>
              <li>
                <a
                  href="/services/modifications"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Custom Modifications
                </a>
              </li>
              <li>
                <a
                  href="/services/emergency"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Emergency Service
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/book-service"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Book Service
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Customer Login
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  style={{ color: "var(--color-text-secondary)" }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Contact
            </h3>
            <div
              className="space-y-2 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:info@autocarepro.com"
                  className="hover:text-white transition-colors"
                >
                  info@autocarepro.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </p>
              <p>
                <span className="font-medium">Address:</span> 123 Auto Lane
              </p>
              <p>
                <span className="font-medium">Hours:</span> Mon-Sat 8AM-6PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        style={{
          backgroundColor: "rgb(from var(--color-primary) r g b / 0.77)",
        }}
        className="py-3"
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2025 AutoCare Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
