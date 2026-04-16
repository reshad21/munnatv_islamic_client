/**
 * Extracts the YouTube video ID from a YouTube URL
 * @param url YouTube video URL
 * @returns YouTube video ID or null if not found
 */
export function getYouTubeVideoId(url: string): string | null {
    if (!url) return null
  
    // Regular expressions to match various YouTube URL formats
    const regexps = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
      /youtube\.com\/watch\?.*v=([^&]+)/,
      /youtube\.com\/shorts\/([^?&/]+)/,
    ]
  
    for (const regex of regexps) {
      const match = url.match(regex)
      if (match && match[1]) {
        return match[1]
      }
    }
  
    return null
  }
  
  /**
   * Gets the thumbnail URL for a YouTube video
   * @param url YouTube video URL
   * @param quality Thumbnail quality (default: 'hqdefault')
   * @returns Thumbnail URL or placeholder if video ID cannot be extracted
   */
  export function getYouTubeThumbnail(
    url: string,
    quality: "default" | "hqdefault" | "mqdefault" | "sddefault" | "maxresdefault" = "hqdefault",
  ): string {
    const videoId = getYouTubeVideoId(url)
  
    if (!videoId) {
      return "/placeholder.svg?height=315&width=560"
    }
  
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
  }
  