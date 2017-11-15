export default function readImageFile(file) {
  return new Promise((resolve) => {
    const image = new Image();
    const fileReader = new FileReader();

    image.onload = function() {
      resolve(image);
    }

    fileReader.onload = function() {
      image.src = fileReader.result;
    }
    fileReader.readAsDataURL(file);
  });
}
