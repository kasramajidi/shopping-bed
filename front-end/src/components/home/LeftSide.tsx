import Link from "next/link";

export default function LeftSide() {
  return (
    <section className="flex flex-col w-1/2 gap-8">
      <h1 className="text-[rgb(57,78,106)] max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        We are changing the way people shop
      </h1>
      <span className="max-w-xl text-lg leading-8 text-[rgb(57,78,106)]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
        repellat explicabo enim soluta temporibus asperiores aut obcaecati
        perferendis porro nobis
      </span>
      <Link href={"/Products"} className="bg-[rgb(5,122,255)] px-4 py-3 text-[#DBE1FF] hover:bg-[rgb(5,100,255)] border self-start border-[rgb(5,122,255)] rounded-lg">Our Products</Link>
    </section>
  );
}
