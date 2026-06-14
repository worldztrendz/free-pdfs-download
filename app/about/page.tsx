import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "../text-page.module.css";

export const metadata: Metadata = {
  title: "About Us - Free Pdfs Download",
  description: "Learn more about Free Pdfs Download, our mission to democratize education, and our team of content curators.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  const breadcrumbItems = [{ label: "About Us" }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>About Free Pdfs Download</h1>
        <p className={styles.subtitle}>Empowering students and educators through free educational resources.</p>
        
        <div className={styles.content}>
          <p>
            Welcome to <strong>Free Pdfs Download</strong>, a free educational resource sharing platform. Our platform was founded
            with a single, clear objective: to make high-quality academic notes and reference materials accessible to
            every student, anywhere, completely free of charge.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that education is a fundamental human right, and financial constraints should never stand in the
            way of academic success. By providing clean, structured, and easy-to-read lecture notes in PDF format, we
            aim to assist students in preparing for exams, understanding complex concepts, and excelling in their courses.
          </p>

          <h2>What We Offer</h2>
          <p>
            Our library is carefully organized into categories like BSc Physics, BSc Mathematics, Computer Science, MSc
            Chemistry, and Engineering. We curate notes from experienced professors, top-performing students, and verified
            academic sources. Every file is:
          </p>
          <ul>
            <li><strong>100% Free:</strong> No hidden costs, subscription fees, or paywalls.</li>
            <li><strong>Verified Quality:</strong> Legible, well-structured, and highly relevant to modern curricula.</li>
            <li><strong>Secure Downloads:</strong> Scanned and verified to ensure clean, malware-free PDF files.</li>
          </ul>

          <h2>Get Involved</h2>
          <p>
            Free Pdfs Download is driven by a passionate community of learners and educators. If you have high-quality notes that
            could help other students, we encourage you to share them with us. Reach out via our Contact Page to see how
            you can contribute to our growing library.
          </p>
        </div>
      </div>
    </div>
  );
}
