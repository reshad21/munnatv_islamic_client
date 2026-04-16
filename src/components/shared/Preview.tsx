"use client";

import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface PreviewProps {
  content: string;
  className?: string;
  limitCount?: number;
  /**
   * Optional array of positions (word counts) where to insert ads
   * e.g. [100, 300] will insert ads after 100 words and 300 words
   */
  adPositions?: number[];
  /**
   * Optional ad component to insert at specified positions
   * If not provided, a default ad placeholder will be used
   */
  adComponent?: ReactNode;
  /**
   * Optional boolean to show content as plain text without HTML tags
   * If true, the content will be rendered as plain text
   */
  plainText?: boolean;
}

const Preview = ({
  content,
  className,
  limitCount,
  adPositions,
  adComponent,
  plainText = false,
}: PreviewProps) => {
  const baseStyles =
    "prose prose-sm sm:prose lg:prose-lg xl:prose-xl [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_p]:mb-4";

  // Function to strip HTML tags and preserve line breaks
  const stripHtml = (html: string) => {
    if (typeof window === "undefined") return html;
    const tmp = document.createElement("div");
    tmp.innerHTML = html.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>");
    return tmp.textContent || tmp.innerText || "";
  };

  // Function to format content with proper paragraph spacing
  const formatContent = (text: string) => {
    return text.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>");
  };

  // If plainText is true, render content without HTML
  if (plainText) {
    const textContent = stripHtml(content);
    const limitedText = limitCount
      ? textContent.split(" ").slice(0, limitCount).join(" ") + "..."
      : textContent;

    return (
      <div className={className} style={{ lineHeight: 1.8 }}>
        {limitedText}
      </div>
    );
  }

  // If limitCount is provided, just show the limited content
  if (limitCount) {
    return (
      <div
        className={cn(baseStyles, className)}
        dangerouslySetInnerHTML={{ __html: `<p>${formatContent(content)}</p>` }}
      />
    );
  }

  // If no ad positions are specified, render the content normally
  if (!adPositions || adPositions.length === 0) {
    return (
      <div
        className={cn(baseStyles, className)}
        dangerouslySetInnerHTML={{ __html: `<p>${formatContent(content)}</p>` }}
      />
    );
  }

  // Create content chunks based on character count instead of word count
  const contentChunks: string[] = [];
  let lastPosition = 0;
  const contentLength = content.length;

  // Sort positions to ensure they're in ascending order and convert word positions to character positions
  const sortedPositions = [...adPositions]
    .sort((a, b) => a - b)
    .map((wordPosition) => Math.floor((wordPosition / 100) * contentLength));

  sortedPositions.forEach((position) => {
    if (position > lastPosition && position < contentLength) {
      const chunk = content.substring(lastPosition, position);
      contentChunks.push(chunk);
      lastPosition = position;
    }
  });

  // Add the remaining content
  if (lastPosition < contentLength) {
    const chunk = content.substring(lastPosition);
    contentChunks.push(chunk);
  }

  // Default ad component if none provided
  const defaultAdComponent = (
    <div className="my-6 p-4 bg-gray-100 rounded-lg text-center">
      <p className="text-gray-500">Advertisement</p>
    </div>
  );

  // Render content chunks with ads in between
  return (
    <div className={cn(baseStyles, className)}>
      {contentChunks.map((chunk, index) => (
        <React.Fragment key={index}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>${formatContent(chunk)}</p>`,
            }}
          />
          {index < contentChunks.length - 1 && (
            <div className="not-prose">{adComponent || defaultAdComponent}</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Preview;
