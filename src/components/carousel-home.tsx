"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CarouselItem {
  image: string;
}

const carouselItems: CarouselItem[] = [
  { image: "/carousel/1.png" },
  { image: "/carousel/2.png" },
  { image: "/carousel/3.png" },
  { image: "/carousel/4.png" },
];

const CarouselHome = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000 }}
      className="w-full"
    >
      {carouselItems.map((item, index) => (
        <SwiperSlide
          key={index}
          className="relative flex items-center justify-center"
        >
          <img
            src={item.image}
            alt={`Carousel item ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselHome;
