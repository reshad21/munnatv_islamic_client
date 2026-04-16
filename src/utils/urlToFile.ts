export async function urlToFile(url: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'profile-photo.jpg', { type: blob.type });
  }