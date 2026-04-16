import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Testimonial type
type Testimonial = {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  bengaliText: string;
};

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center mb-2">
    {[...Array(rating)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="bg-white rounded-2xl shadow-2xl border-0 transform transition-all duration-300 hover:scale-105 h-full">
    <CardContent className="p-4 md:p-6 flex flex-col h-full">
      {/* Profile Image */}
      <div className="flex justify-center mb-3">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-yellow-500">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Quote Icon */}
      <div className="flex justify-center mb-2">
        <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Testimonial Text */}
      <p className="text-sm text-gray-700 text-center mb-3 leading-relaxed flex-grow line-clamp-4">
        {testimonial.bengaliText}
      </p>

      {/* Name and Location */}
      <div className="border-t pt-3 mt-auto">
        <h4 className="text-sm md:text-base font-bold text-gray-900 text-center">
          {testimonial.name}
        </h4>
        <p className="text-xs text-gray-500 text-center">
          {testimonial.location}
        </p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;