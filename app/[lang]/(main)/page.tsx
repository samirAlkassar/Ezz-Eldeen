import Hero from "@/components/layout/Hero";
import Categories from "@/components/layout/Categories";
import Testimonials from "@/components/layout/Testimonials";
import { getProducts, getHomeSections } from "@/features/products/server/getProducts";
import { HomeSectionType } from "@/features/products/server/getProducts";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  const currentLang = lang || "en";
  setRequestLocale(currentLang);

  const t = await getTranslations("IndexPage");

  // Fetch main products
  const mainProducts = await getProducts({ page: 1, limit: 8 }, currentLang);

  // Fetch HOME_SECTIONS dynamically
  const homeSections = await getHomeSections(currentLang);

  const sectionResults = await Promise.all(
    homeSections.map(async (section) => {
      const res = await getProducts(section.query || {}, currentLang);
      return {
        id: section.id,
        title: section.title,
        products: res?.products || [],
      };
    })
  );

  const sections: HomeSectionType[] = sectionResults;

  return (
    <>
      <Hero />
      <Categories products={mainProducts?.products || []} sections={sections} lang={currentLang as typeLang} />
      <Testimonials />
    </>
  );
}
