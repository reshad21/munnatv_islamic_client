"use client";


import {Pencil, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DeleteReviewDialog from "./DeleteReviewDialog";
import {  updateReviewStatus } from "@/services/review";

interface Review {
  id: string;
  image: string;
  name: string;
  description: string;
  rating: number;
  status: boolean;
}


interface ReviewsTableProps {
  reviewsData: Review[];
}

const ReviewsTable = ({ reviewsData = [] }: ReviewsTableProps) => {
  const [reviews, setReviews] = useState<Review[]>(reviewsData);

  useEffect(() => {
    setReviews(reviewsData);
  }, [reviewsData]);

  const handleStatusChange = async (review: Review) => {
    const res = await updateReviewStatus(review.id, !review.status);
    if (res.statusCode === 200) {
      setReviews((prev) => prev.map((r) => (r.id === review.id ? { ...r, status: !r.status } : r)));
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">SN</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Image</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Reviews</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Rating</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              reviews.map((review, idx) => (
                <tr key={review.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-gray-600">{idx + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-14 h-14 rounded-lg overflow-hidden relative">
                      <Image src={review.image} alt={review.name} fill className="object-cover" unoptimized/>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{review.name}</td>
                  <td className="py-4 px-6 text-gray-600 max-w-xs">
                    <p className="line-clamp-2">
                      {review.description.length > 10
                        ? `${review.description.slice(0, 10)}...`
                        : review.description}
                    </p>
                  </td>
                  <td className="py-4 px-6">{renderStars(review.rating)}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleStatusChange(review)}
                      className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${review.status ? "bg-[#0f3d3e]" : "bg-gray-300"}`}
                      aria-pressed={review.status}
                      aria-label={review.status ? "Active" : "Inactive"}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${review.status ? "right-1" : "left-1"}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/reviews/edit/${review.id}`}
                        className="w-8 h-8 flex items-center justify-center border border-[#0f3d3e] text-[#0f3d3e] rounded hover:bg-[#0f3d3e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteReviewDialog id={review.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReviewsTable;
