// Utility function to remove HTML tags
const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  }

  export default stripHtmlTags