import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "../text-page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy - Free Pdfs download",
  description: "Read the Free Pdfs download privacy policy to understand how we protect user privacy and handle data safety.",
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [{ label: "Privacy Policy" }];

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Privacy Policy</h1>
        
        <div className={styles.content}>
          <p>Last updated: June 14, 2026</p>
          
          <p>
            At Free Pdfs download, accessible from freepdfsdownload.com, one of our main priorities is the privacy of our visitors.
            This Privacy Policy document contains types of information that is collected and recorded by Free Pdfs download and how
            we use it.
          </p>

          <h2>Information We Collect</h2>
          <p>
            Free Pdfs download is a static website powered by local data. We do not require you to register an account or provide
            personal identifiable information to search, browse, or download PDF notes.
          </p>
          <p>
            If you contact us directly via email or our contact form, we may collect your name, email address, the content of
            your message, and any attachments you choose to send.
          </p>

          <h2>Log Files</h2>
          <p>
            Free Pdfs download follows a standard procedure of using log files. These files log visitors when they visit websites.
            The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service
            Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked
            to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering
            the site, tracking users&apos; movement on the website, and gathering demographic information.
          </p>

          <h2>Cookies and Web Beacons</h2>
          <p>
            Like any other website, Free Pdfs download uses &apos;cookies&apos;. These cookies are used to store information including
            visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is
            used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type
            and/or other information.
          </p>

          <h2>Third-Party Policies</h2>
          <p>
            Free Pdfs download&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult
            the respective Privacy Policies of these third-party ad servers for more detailed information. It may include
            their practices and instructions about how to opt-out of certain options.
          </p>

          <h2>Consent</h2>
          <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
        </div>
      </div>
    </div>
  );
}
