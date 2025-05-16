export const uploadToCloudinary = async (file) => {
  const cloud_name = "doilrq33o";
  const upload_preset = "EZsmart";

  if (!file) {
    console.error("No file provided!");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.url;
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error);
    return null;
  }
};
