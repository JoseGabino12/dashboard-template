'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { ChartSels } from './charts/ChartSels';
import type { ChartSliderProps } from '@/interfaces/interfaces';
import { ChartBloquera } from "./charts/ChartBloquera";
import { ChartConcretera } from "./charts/ChartConcretera";

export function ChartSlider({ sales, bloqueraItems, concreteraItems }: ChartSliderProps) {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <ChartBloquera bloqueraItems={ bloqueraItems } />
        </CarouselItem>

        <CarouselItem>
          <ChartSels sales={ sales } />
        </CarouselItem>

        <CarouselItem>
          <ChartConcretera concreteraItems={ concreteraItems } />
        </CarouselItem>

      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}