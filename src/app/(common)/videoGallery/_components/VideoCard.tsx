"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Image from 'next/image'
import { getYouTubeThumbnail, getYouTubeVideoId } from '@/utils/youtube-utils'
import { Play, X } from 'lucide-react'

interface VideoCardProps {
  video: any
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const imageSrc = imageFailed 
    ? '/placeholder.svg?height=90&width=120'
    : getYouTubeThumbnail(video.videoUrl, 'default')

  const handleImageError = () => {
    setImageFailed(true)
  }

  const handlePlayClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const videoId = getYouTubeVideoId(video.videoUrl)

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div 
        className="relative w-full h-48 cursor-pointer group"
        onClick={handlePlayClick}
      >
        <Image 
          src={imageSrc}
          alt={video.title} 
          fill
          className="object-cover group-hover:brightness-75 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
          onError={handleImageError}
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#0f3d3e] line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 line-clamp-2 mt-2">{video.description}</p>
      </div>
      </div>

      {/* Video Player Modal */}
      {isModalOpen && videoId && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video player"
            >
              <X className="w-8 h-8" />
            </button>

            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

export default VideoCard
