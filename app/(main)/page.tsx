import Hero from "@/components/layout/Hero"
import Categories from "@/components/layout/Categories"
import Testimonials from "@/components/layout/Testimonials"
import { getProducts, HOME_SECTIONS } from "@/features/products/server/getProducts"
import { HomeSectionType } from "@/features/products/server/getProducts"

export default async function Home() {
  const mainProducts = await getProducts({ page: 1, limit: 8 })

  const sectionResults = await Promise.all(
    HOME_SECTIONS.map(async (section) => {
      const res = await getProducts(section.query)

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
      />
      <Testimonials />
    </>
  )
}
