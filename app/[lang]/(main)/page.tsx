import Hero from "@/components/layout/Hero"
import Categories from "@/components/layout/Categories"
import Testimonials from "@/components/layout/Testimonials"
import { getProducts, HOME_SECTIONS } from "@/features/products/server/getProducts"
import { HomeSectionType } from "@/features/products/server/getProducts"

export default async function Home({params}:{params: {lang: typeLang}}) {
  const { lang } = await params;
  const currentLang = lang || "en";
  const mainProducts = await getProducts({ page: 1, limit: 8 }, currentLang)
  const sectionResults = await Promise.all(
    HOME_SECTIONS.map(async (section) => {
      const res = await getProducts(section.query, currentLang)

      return {
        id: section.id,
        title: section.title,
        products: res.products,
      }
    })
  )
  
  const sections: HomeSectionType[] = sectionResults

  return (
    <>
      <Hero />
      <Categories
        products={mainProducts.products}
        sections={sections}
        lang={currentLang}/>
      <Testimonials />
    </>
  )
}
