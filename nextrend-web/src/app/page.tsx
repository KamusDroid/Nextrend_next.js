import { Description } from "app/components/Home/Description";
import { Hero } from "app/components/Home/Hero";
import { MainProducts } from "app/components/Home/MainProducts";
import Image from 'next/image';


export default function Home() {
  return (
    <main className="homePage">

      <Hero />
      
      <Description />

      <MainProducts />

    </main>
  )
}
