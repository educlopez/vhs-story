export const generateImageWithPrompt = async (
  publicId: string,
  prompt: string
) => {
  try {
    const response = await fetch("/api/image-cloud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId, prompt }),
    });

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
  }
};
