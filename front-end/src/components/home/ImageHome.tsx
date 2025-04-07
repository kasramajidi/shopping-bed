"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const images = [
  "/img/hero1-deae5a1f.webp",
  "/img/hero2-2271e3ad.webp",
  "/img/hero3-a83f0357.webp",
  "/img/hero4-4b9de90e.webp",
];

export default function ImageHome() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse dragging
  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Handle touch dragging for mobile
  const startTouchDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const onTouchDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopTouchDrag = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative flex justify-center items-center bg-[#0B1930] rounded-2xl pl-4 h-[26rem] w-full sm:w-1/2 max-w-5xl mx-auto overflow-hidden">
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-scroll no-scrollbar w-full cursor-grab active:cursor-grabbing"
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startTouchDrag}
        onTouchMove={onTouchDrag}
        onTouchEnd={stopTouchDrag}
      >
        {images.map((src, index) => (
          <div key={index} className="w-[320px] h-[450px] flex-shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={400}
              height={500}
              className="rounded-2xl object-cover w-full h-full"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
