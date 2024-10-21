export const uploadToCloudinary = async (imageDataUrl: string) => {
  const formData = new FormData();
  formData.append("file", imageDataUrl);
  formData.append("upload_preset", "unsigned-media");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/paio458/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};
