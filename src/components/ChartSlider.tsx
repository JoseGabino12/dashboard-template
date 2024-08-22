'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/slider.css'

import { ChartSels } from './charts/ChartSels';

export function ChartSlider() {
  return (
    <Swiper
      spaceBetween={100}
      slidesPerView={1}
      navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination]}
    >
      <SwiperSlide>
        <ChartSels />
      </SwiperSlide>
      <SwiperSlide>
        <ChartSels />
      </SwiperSlide>

      {/* Puedes agregar más SwiperSlides si es necesario */}
    </Swiper>
  );
}