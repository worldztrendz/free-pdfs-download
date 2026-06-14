import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "../text-page.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions - Free Pdfs Download",
  description: "Review the Terms & Conditions of Free Pdfs Download concerning the download, copying, and distribution of educational PDFs.",
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
            Welcome to Free Pdfs Download! These terms and conditions outline the rules and regulations for the use of
            Free Pdfs Download&apos;s Website, located at freepdfsdownload.com.
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Free Pdfs Download
            if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from Free Pdfs Download for commercial purposes.</li>
            <li>Sell, rent, or sub-license material from Free Pdfs Download.</li>
            <li>Reproduce, duplicate, or copy material from Free Pdfs Download to build competing download networks.</li>
            <li>Redistribute content from Free Pdfs Download unless content is specifically made for redistribution.</li>
          </ul>

          <h2>User Contributions</h2>
          <p>
            Parts of this website offer an opportunity for users to submit educational materials or contact the site moderators.
            Free Pdfs Download does not filter, edit, or publish notes without reviewing them. User-submitted notes reflect the views
            and opinions of the person who uploads them. To the extent permitted by applicable laws, Free Pdfs Download shall not be
            liable for the submitted notes or for any expense, liability, damages, or expenses caused as a result of any use of
            the notes.
          </p>

          <h2>Disclaimer of Liability</h2>
          <p>
            All the materials on this website are provided &quot;as is&quot; for educational reference purposes only. Free Pdfs Download makes
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation,
            implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </div>
      </div>
    </div>
  );
}
