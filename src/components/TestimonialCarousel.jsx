import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard.jsx";
import { testimonials } from "../data/siteData.js";

export default function TestimonialCarousel() {
  return (
    <Swiper modules={[Autoplay, Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 4200 }} loop spaceBetween={24} breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}>
      {testimonials.map((item) => (
        <SwiperSlide key={item.name} className="h-full pb-12">
          <TestimonialCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
