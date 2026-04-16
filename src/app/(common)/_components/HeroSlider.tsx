/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"

interface SliderItem {
  id: string;
  image: string;
  heroSectionId: string;
  createdAt: string;
  updatedAt: string;
}

interface HeroSliderProps {
  sliderItems: SliderItem[];
}

export function HeroSlider({ sliderItems }: HeroSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const getActualIndex = () => {
    if (!api || !sliderItems) return 0
    return api.selectedScrollSnap() % sliderItems.length
  }

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <div className="w-full max-w-md md:max-w-lg mx-auto">
      <Carousel 
        setApi={setApi}
        className="w-full"
        plugins={[plugin.current]}
        opts={{
          align: "center",
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {sliderItems && sliderItems.length > 0 && sliderItems.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-2xl shadow-2xl">
                <Image 
                  src={item.image} 
                  alt={`Slide ${index + 1}`} 
                  fill
                  className="object-contain"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bullet Points */}
      <div className="flex justify-center gap-2 mt-4">
        {sliderItems?.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              getActualIndex() === index 
                ? "w-8 h-2 bg-yellow-500" 
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}