export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
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
  name?: string;

  // Rich article metadata and content schemas
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  content?: {
    introduction: string;
    why_use_notes?: {
      heading: string;
      description: string;
      points: string[];
    };
    available_papers?: {
      heading: string;
      universities: {
        name: string;
        papers: string[];
      }[];
    };
    subjects?: {
      heading: string;
      description: string;
      topics: {
        name: string;
        subtopics: string[];
      }[];
    };
    subjects_covered?: {
      heading: string;
      topics: string[];
    };
    benefits_of_pdf?: {
      heading: string;
      points: string[];
    };
    benefits_of_previous_papers?: {
      heading: string;
      points: string[];
    };
    exam_preparation_tips?: {
      heading: string;
      tips: string[];
    };
    preparation_tips?: {
      heading: string;
      tips: string[];
    };
    who_can_use?: {
      heading: string;
      points: string[];
    };
    download_section?: {
      heading: string;
      description: string;
      downloads: string[];
    };
    faq?: {
      question: string;
      answer: string;
    }[];
    conclusion: string;
  };
}
