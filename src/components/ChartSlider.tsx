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
import { ChartPayment } from "./charts/ChartPayment";

export function ChartSlider ({ sales, bloqueraItems, concreteraItems, payment }: ChartSliderProps) {
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

        <CarouselItem>
          <ChartPayment payments={ payment } />
        </CarouselItem>

      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}