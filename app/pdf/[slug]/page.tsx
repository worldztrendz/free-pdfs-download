import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import DownloadButton from "@/components/DownloadButton";
import PdfCard from "@/components/PdfCard";
import { getPdfBySlug, getPdfs, getCategoryBySlug, getRelatedPdfs } from "@/lib/data";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pdfs = getPdfs();
  return pdfs.map((pdf) => ({
    slug: pdf.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pdf = getPdfBySlug(slug);

  if (!pdf) {
    return {
      title: "PDF Not Found",
    };
  }

  return {
    title: `${pdf.title} Free Download PDF - Free Pdfs download`,
    description: pdf.description,
    alternates: {
      canonical: `/pdf/${pdf.slug}`,
    },
    openGraph: {
      title: `${pdf.title} Free Download PDF - Free Pdfs download`,
      description: pdf.description,
      url: `https://freepdfsdownload.com/pdf/${pdf.slug}`,
      images: [
        {
          url: "https://freepdfsdownload.com/images/default-meta.jpg",
          width: 1200,
          height: 630,
          alt: pdf.title,
        },
      ],
    },
  };
}

export default async function PdfDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pdf = getPdfBySlug(slug);

  if (!pdf) {
    notFound();
  }

  const category = getCategoryBySlug(pdf.category);
  const relatedPdfs = getRelatedPdfs(pdf, 4);

  // Format category slug to human-readable
  const categoryLabel = category ? category.name : pdf.category;

  const breadcrumbItems = [
    { label: categoryLabel, url: category ? `/category/${category.slug}` : undefined },
    { label: pdf.title }
  ];

  // JSON-LD structured data for Digital Document
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": pdf.title,
    "description": pdf.description,
    "fileFormat": "application/pdf",
    "url": `https://freepdfsdownload.com/pdf/${pdf.slug}`,
    "author": {
      "@type": "Person",
      "name": pdf.author || "Academic Contributor"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Free Pdfs download",
      "url": "https://freepdfsdownload.com"
    },
    "datePublished": pdf.dateAdded,
    "size": pdf.fileSize
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        <div className={styles.layout}>
          {/* Thumbnail / Document Display Column */}
          <div className={styles.thumbnailCol}>
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnailPlaceholder}>
                <div className={styles.placeholderIcon}>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span className={styles.placeholderText}>PDF Notes</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "500" }}>
                  {pdf.fileSize} • {pdf.pageCount} Pages
                </span>
              </div>
            </div>
          </div>

          {/* Details / Download Column */}
          <div className={styles.contentCol}>
            {category && (
              <Link href={`/category/${category.slug}`} className={styles.categoryBadge}>
                {category.name}
              </Link>
            )}

            <h1 className={styles.title}>{pdf.title}</h1>

            {pdf.content ? (
              <div className={styles.richArticle}>
                <p className={styles.introText}>{pdf.content.introduction}</p>

                {pdf.content.why_use_notes && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.why_use_notes.heading}</h2>
                    <p className={styles.articleText}>{pdf.content.why_use_notes.description}</p>
                    <ul className={styles.articleList}>
                      {pdf.content.why_use_notes.points.map((point: string, idx: number) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.available_papers && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.available_papers.heading}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "12px" }}>
                      {pdf.content.available_papers.universities.map((uni: any, idx: number) => (
                        <div key={idx} className={styles.topicCard} style={{ width: "100%" }}>
                          <h3 className={styles.topicName} style={{ marginBottom: "8px" }}>{uni.name}</h3>
                          <ul className={styles.subtopicsList}>
                            {uni.papers.map((paper: string, pIdx: number) => (
                              <li key={pIdx} className={styles.subtopicItem}>
                                <svg
                                  className={styles.subtopicIcon}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  style={{ color: "var(--primary-color)", flexShrink: 0 }}
                                >
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {paper}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {pdf.content.subjects && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.subjects.heading}</h2>
                    <p className={styles.articleText}>{pdf.content.subjects.description}</p>
                    <div className={styles.topicsGrid}>
                      {pdf.content.subjects.topics.map((topic: any, idx: number) => (
                        <div key={idx} className={styles.topicCard}>
                          <h3 className={styles.topicName}>{topic.name}</h3>
                          <ul className={styles.subtopicsList}>
                            {topic.subtopics.map((sub: string, sIdx: number) => (
                              <li key={sIdx} className={styles.subtopicItem}>
                                <svg
                                  className={styles.subtopicIcon}
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  style={{ color: "var(--primary-color)", flexShrink: 0 }}
                                >
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {pdf.content.subjects_covered && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.subjects_covered.heading}</h2>
                    <ul className={styles.articleCheckList}>
                      {pdf.content.subjects_covered.topics.map((topic: string, idx: number) => (
                        <li key={idx} className={styles.checkListItem}>
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.benefits_of_pdf && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.benefits_of_pdf.heading}</h2>
                    <ul className={styles.articleCheckList}>
                      {pdf.content.benefits_of_pdf.points.map((point: string, idx: number) => (
                        <li key={idx} className={styles.checkListItem}>
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.benefits_of_previous_papers && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.benefits_of_previous_papers.heading}</h2>
                    <ul className={styles.articleCheckList}>
                      {pdf.content.benefits_of_previous_papers.points.map((point: string, idx: number) => (
                        <li key={idx} className={styles.checkListItem}>
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.exam_preparation_tips && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.exam_preparation_tips.heading}</h2>
                    <ol className={styles.tipsList}>
                      {pdf.content.exam_preparation_tips.tips.map((tip: string, idx: number) => (
                        <li key={idx} className={styles.tipItem}>
                          <span className={styles.tipNumber}>{idx + 1}</span>
                          <span className={styles.tipText}>{tip}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {pdf.content.preparation_tips && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.preparation_tips.heading}</h2>
                    <ol className={styles.tipsList}>
                      {pdf.content.preparation_tips.tips.map((tip: string, idx: number) => (
                        <li key={idx} className={styles.tipItem}>
                          <span className={styles.tipNumber}>{idx + 1}</span>
                          <span className={styles.tipText}>{tip}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {pdf.content.who_can_use && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.who_can_use.heading}</h2>
                    <ul className={styles.articleCheckList}>
                      {pdf.content.who_can_use.points.map((point: string, idx: number) => (
                        <li key={idx} className={styles.checkListItem}>
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.download_section && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>{pdf.content.download_section.heading}</h2>
                    <p className={styles.articleText}>{pdf.content.download_section.description}</p>
                    <ul className={styles.articleCheckList}>
                      {pdf.content.download_section.downloads.map((item: string, idx: number) => (
                        <li key={idx} className={styles.checkListItem}>
                          <svg
                            className={styles.checkIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            style={{ color: "var(--primary-color)" }}
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {pdf.content.faq && (
                  <section className={styles.articleSection}>
                    <h2 className={styles.articleSubheading}>Frequently Asked Questions (FAQs)</h2>
                    <div className={styles.faqList}>
                      {pdf.content.faq.map((faqItem: any, idx: number) => (
                        <details key={idx} className={styles.faqItem}>
                          <summary className={styles.faqQuestion}>
                            <span>{faqItem.question}</span>
                            <span className={styles.faqArrow}>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className={styles.faqAnswer}>
                            <p>{faqItem.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                <section className={`${styles.articleSection} ${styles.conclusionBox}`}>
                  <p className={styles.introText}>{pdf.content.conclusion}</p>
                </section>
              </div>
            ) : (
              <div className={styles.descriptionBox}>
                <h2 className={styles.descriptionTitle}>Description / Overview</h2>
                <p className={styles.descriptionText}>{pdf.description}</p>
              </div>
            )}

            {/* File Info Grid */}
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Author / Contributor</div>
                  <div className={styles.infoValue}>{pdf.author || "Academic Board"}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>File Size</div>
                  <div className={styles.infoValue}>{pdf.fileSize}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Page Count</div>
                  <div className={styles.infoValue}>{pdf.pageCount} Pages</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Date Added</div>
                  <div className={styles.infoValue}>
                    {new Date(pdf.dateAdded).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>Total Downloads</div>
                  <div className={styles.infoValue}>{pdf.downloadCount.toLocaleString()}</div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <div>
                  <div className={styles.infoLabel}>File Format</div>
                  <div className={styles.infoValue}>PDF Document</div>
                </div>
              </div>
            </div>

            {/* Stateful Interactive Download Button */}
            <div style={{ marginTop: "12px" }}>
              <DownloadButton pdfUrl={pdf.pdfUrl} pdfTitle={pdf.title} />
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="22" x2="12" y2="18"></line>
                  <line x1="12" y1="6" x2="12" y2="2"></line>
                  <line x1="12" y1="10" x2="12" y2="14"></line>
                </svg>
                Secure and scanned for viruses. Clean download guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Related PDFs Section */}
        {relatedPdfs.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Study Materials</h2>
            <div className={styles.relatedGrid}>
              {relatedPdfs.map((relatedPdf) => (
                <PdfCard key={relatedPdf.id} pdf={relatedPdf} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
