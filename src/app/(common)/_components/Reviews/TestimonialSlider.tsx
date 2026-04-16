/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialCard from "./TestimonialCard";
import reviewBg from "../../../../../public/review-bg.png"

// Navigation Buttons Component
const NavigationButtons = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="flex justify-center items-center gap-4">
    <button
      onClick={onPrev}
      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all transform hover:scale-110"
    >
      <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
    </button>
    <button
      onClick={onNext}
      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-110"
    >
      <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  </div>
);

// No Data Component
const NoDataMessage = () => (
  <div className="flex flex-col items-center justify-center py-16 md:py-24">
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center max-w-md">
      <svg
        className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        কোনো রিভিউ পাওয়া যায়নি
      </h3>
      <p className="text-gray-300 text-sm md:text-base">
        No reviews found at the moment
      </p>
    </div>
  </div>
);

// Main Component
const TestimonialSlider = ({ reviews }: { reviews: any[] }) => {
  const [api, setApi] = useState<any>(null);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  // Filter reviews to show only the ones with status: true
  const activeReviews = reviews?.filter((review) => review.status === true) || [];

  // Check if reviews exist and have data
  const hasReviews = activeReviews.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${reviewBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl">
        <TestimonialHeader />

        {/* Conditional Rendering */}
        {!hasReviews ? (
          <NoDataMessage />
        ) : (
          <>
            {/* Carousel */}
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full mb-8"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {activeReviews.map((review) => (
                  <CarouselItem
                    key={review.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <TestimonialCard
                        testimonial={{
                          id: review.id,
                          name: review.name,
                          location: review.designation,
                          image:
                            review.image ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}&backgroundColor=b6e3f4`,
                          rating: review.rating,
                          bengaliText: review.description,
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <NavigationButtons onPrev={scrollPrev} onNext={scrollNext} />
          </>
        )}
      </div>
    </div>
  );
};

export default TestimonialSlider;