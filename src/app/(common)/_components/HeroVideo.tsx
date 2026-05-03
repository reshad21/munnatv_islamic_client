const VIDEO_LINK = "https://www.youtube.com/embed/aqz-KE-bpKQ"

const toEmbedUrl = (url: string) => {
  if (!url) return VIDEO_LINK

  if (url.includes("youtube.com/embed/")) {
    return url
  }

  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "")
      return id ? `https://www.youtube.com/embed/${id}` : VIDEO_LINK
    }

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v")
      return id ? `https://www.youtube.com/embed/${id}` : VIDEO_LINK
    }
  } catch {
    return VIDEO_LINK
  }

  return VIDEO_LINK
}

const getEmbedVideoId = (embedUrl: string) => {
  const match = embedUrl.match(/youtube\.com\/embed\/([^?&/]+)/)
  return match?.[1] || ""
}

const HeroVideo = ({ youtubeUrl }: { youtubeUrl?: string }) => {
  const embedUrl = toEmbedUrl(youtubeUrl || VIDEO_LINK)
  const videoId = getEmbedVideoId(embedUrl)
  const separator = embedUrl.includes("?") ? "&" : "?"
  const iframeUrl = `${embedUrl}${separator}autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0`

  return (
    <section className="w-full py-8 px-4">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-black shadow-xl">
        <div className="relative aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={iframeUrl}
            title="Hero Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

export default HeroVideo
