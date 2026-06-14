"use client";

import React, { useState } from "react";
import styles from "./DownloadButton.module.css";

interface DownloadButtonProps {
  pdfUrl: string;
  pdfTitle: string;
}

type DownloadStatus = "idle" | "preparing" | "success";

export default function DownloadButton({ pdfUrl, pdfTitle }: DownloadButtonProps) {
  const [status, setStatus] = useState<DownloadStatus>("idle");

  const handleDownload = () => {
    if (status !== "idle") return;

    setStatus("preparing");

    // Simulate a brief delay to prepare/stream the PDF for download, providing dynamic feedback
    setTimeout(() => {
      try {
        const link = document.createElement("a");
        link.href = pdfUrl;
        
        // Suggest file name based on title
        const filename = pdfTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".pdf";
        link.setAttribute("download", filename);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setStatus("success");

        // Reset to idle after 3 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      } catch (err) {
        console.error("Download failed:", err);
        setStatus("idle");
      }
    }, 1500);
  };

  return (
    <button
      onClick={handleDownload}
      className={`${styles.btn} ${
        status === "preparing" ? styles.disabled : status === "success" ? styles.success : ""
      }`}
      disabled={status === "preparing"}
      aria-label={
        status === "preparing"
          ? "Preparing PDF file"
          : status === "success"
          ? "PDF file downloaded successfully"
          : "Download PDF"
      }
    >
      {status === "idle" && (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download Free PDF</span>
        </>
      )}

      {status === "preparing" && (
        <>
          <div className={styles.spinner} role="presentation"></div>
          <span>Preparing Download...</span>
        </>
      )}

      {status === "success" && (
        <>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Downloaded Successfully!</span>
        </>
      )}
    </button>
  );
}
