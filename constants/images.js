const imageNames = [
  "one.png",
  "twoTemplate.png",
  "threeTemplate.png",
  "four.png",
  "five.png",
  "six.png",
];

// Function to load and convert each image to a Data URI
function convertImagesToDataURI(imageNames, imageFolder) {
  const promises = imageNames.map((imageName) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Handle cross-origin issues if loading from a server

      // Event triggered when the image loads
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Convert the image to a Data URI
        const dataURI = canvas.toDataURL("image/png"); // Default is PNG, change if necessary
        resolve({ name: imageName, dataURI });
      };

      // Handle errors during loading
      img.onerror = function () {
        reject(new Error(`Failed to load image: ${imageName}`));
      };

      // Set the image source (local folder or URL)
      img.src = `${imageFolder}/${imageName}`;
    });
  });

  return Promise.all(promises);
}

// Usage Example
const imageFolder = "./";

export const getImagesURL = async () => {
  try {
    const images = await convertImagesToDataURI(
      imageNames,
      imageFolder
    );
    return images;
  } catch (error) {
    console.log(error);
  }
};
