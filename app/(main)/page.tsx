import Categories from "@/components/layout/Categories";
import Hero from "@/components/layout/Hero";
import Testimonials from "@/components/layout/Testimonials";
import { ProductsResponse } from "@/features/products/productsAPI";
import { ProductType } from "@/features/products/types";

export type HomeSectionType = {
  id: "categories" | "rating" | "new" | "games" | "school";
  title: string;
  products: ProductType[];
};

export default async function Home() {
  const data = await fetch('https://ezz-eldeen-server.vercel.app/products?page=1&limit=8', { cache: "no-store" })
  const products = await data.json();

  const [bestSellersRes, gamesRes, schoolRes] = await Promise.all([
    fetch("https://ezz-eldeen-server.vercel.app/products?sort=rating&limit=12", { cache: "no-store" }),
    fetch("https://ezz-eldeen-server.vercel.app/products?category=Toys%20%26%20Games&limit=12", { cache: "no-store" }),
    fetch("https://ezz-eldeen-server.vercel.app/products?category=School%20Supplies&limit=12", { cache: "no-store" }),
  ]);

  const [bestSellers, games, school] = await Promise.all([
    bestSellersRes.json(),
    gamesRes.json(),
    schoolRes.json(),
  ]);

  const sections:  HomeSectionType[] = [
    { id: "rating", title: "Best Sellers", products: bestSellers.products },
    { id: "games", title: "Games", products: games.products },
    { id: "school", title: "School Supplies", products: school.products },
  ];
  
  console.log("server products:",sections[0].products)
  return (
    <>
      <Hero />
      <Categories products={products} sections={sections}/>
      <Testimonials />
    </>
  );
}
