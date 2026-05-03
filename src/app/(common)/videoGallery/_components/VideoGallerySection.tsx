"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import VideoCard from './VideoCard'

const VideoGallerySection = ({ videos }: { videos: any[] }) => {

  return (
    <div className="py-12 bg-gray-50">
      {videos?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d3e] text-center mb-6">Video Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard 
                key={video.id}
                video={video}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No videos available.</p>
      )}

    </div>
  )
}

export default VideoGallerySection
