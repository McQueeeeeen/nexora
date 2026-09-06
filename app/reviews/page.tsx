import type { Metadata } from "next";
import Header from "../../components/Header";
import Contact from "../../components/Contact";
import MobileBar from "../../components/MobileBar";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Nexora Admissions — отзывы студентов об учёбе в Австрии и Венгрии",
  description: "312+ проверенных отзывов студентов: поступление в University of Vienna, TU Wien, ELTE, Corvinus, гранты Stipendium Hungaricum и ВНЖ.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Nexora Admissions",
    url: "https://nexora-eight-opal.vercel.app",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.94",
      reviewCount: 312,
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "https://nexora-eight-opal.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Отзывы",
        item: "https://nexora-eight-opal.vercel.app/reviews",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#120D0B] text-[#FBF9F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <ReviewsClient />
      <Contact />
      <MobileBar />
    </main>
  );
}
