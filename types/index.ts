export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface PDF {
  id: number;
  title: string;
  slug: string;
  category: string; // matches Category.slug
  description: string;
  pdfUrl: string;
  thumbnail: string;
  fileSize: string;      // e.g. "1.5 MB"
  pageCount: number;     // e.g. 48
  dateAdded: string;     // e.g. "2026-06-10"
  isFeatured: boolean;
  isPopular: boolean;
  downloadCount: number; // e.g. 1250
  author?: string;

  // Rich article metadata and content schemas
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  content?: {
    introduction: string;
    why_use_notes?: {
      heading: string;
      description: string;
      points: string[];
    };
    subjects?: {
      heading: string;
      description: string;
      topics: {
        name: string;
        subtopics: string[];
      }[];
    };
    benefits_of_pdf?: {
      heading: string;
      points: string[];
    };
    exam_preparation_tips?: {
      heading: string;
      tips: string[];
    };
    who_can_use?: {
      heading: string;
      points: string[];
    };
    faq?: {
      question: string;
      answer: string;
    }[];
    conclusion: string;
  };
}
