import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "../text-page.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions - Free Pdfs download",
  description: "Review the Terms & Conditions of Free Pdfs download concerning the download, copying, and distribution of educational PDFs.",
  alternates: {
    canonical: "/terms-conditions"
  }
};

export default function TermsConditionsPage() {
  const breadcrumbItems = [{ label: "Terms & Conditions" }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        
        <div className={styles.content}>
          <p>Last updated: June 14, 2026</p>
          
          <p>
            Welcome to Free Pdfs download! These terms and conditions outline the rules and regulations for the use of
            Free Pdfs download&apos;s Website, located at freepdfsdownload.com.
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Free Pdfs download
            if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2>Intellectual Property & Content License</h2>
          <p>
            Unless otherwise stated, Free Pdfs download and/or its licensors own the intellectual property rights for all material
            on Free Pdfs download. All intellectual property rights are reserved. You may access this from Free Pdfs download for your own personal
            academic use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from Free Pdfs download for commercial purposes.</li>
            <li>Sell, rent, or sub-license material from Free Pdfs download.</li>
            <li>Reproduce, duplicate, or copy material from Free Pdfs download to build competing download networks.</li>
            <li>Redistribute content from Free Pdfs download unless content is specifically made for redistribution.</li>
          </ul>

          <h2>User Contributions</h2>
          <p>
            Parts of this website offer an opportunity for users to submit educational materials or contact the site moderators.
            Free Pdfs download does not filter, edit, or publish notes without reviewing them. User-submitted notes reflect the views
            and opinions of the person who uploads them. To the extent permitted by applicable laws, Free Pdfs download shall not be
            liable for the submitted notes or for any expense, liability, damages, or expenses caused as a result of any use of
            the notes.
          </p>

          <h2>Disclaimer of Liability</h2>
          <p>
            All the materials on this website are provided &quot;as is&quot; for educational reference purposes only. Free Pdfs download makes
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation,
            implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </div>
      </div>
    </div>
  );
}
