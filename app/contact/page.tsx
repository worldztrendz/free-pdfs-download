"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "../text-page.module.css";

type FormStatus = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Simulate mock API submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1200);
  };

  const breadcrumbItems = [{ label: "Contact Us" }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Have questions, feedback, or notes to share? We would love to hear from you.</p>

        <div className={styles.contactGrid}>
          {/* Form Box */}
          <div className={styles.formBox}>
            {status === "success" && (
              <div className={styles.successMessage}>
                Thank you! Your message has been sent successfully. We will get back to you shortly.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.formInput}
                  placeholder="John Doe"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.formInput}
                  placeholder="john@example.com"
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g. Note contribution, advertising, bug report"
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.formTextarea}
                  placeholder="Write your message here..."
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info Side Column */}
          <div className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Help & Support
              </h3>
              <p className={styles.infoText}>
                Need help finding specific notes or experiencing issues with downloading a PDF? Feel free to reach out, and
                our moderation team will assist you.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                Share Your Notes
              </h3>
              <p className={styles.infoText}>
                Help your peers! If you want to submit your own study guides or lecture notes to be featured on Free Pdfs download, write
                us a message. We credit all our student and teacher contributors.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Direct Contact
              </h3>
              <p className={styles.infoText}>
                Email: support@freepdfsdownload.com<br />
                Response time: Within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
