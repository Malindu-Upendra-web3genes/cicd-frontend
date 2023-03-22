import { v1 } from 'uuid';

const uniqueId = () => v1();

function fileExtFromUrl(url) {
  return url.split('.').pop().split('#')[0].split('?')[0];
}

const imgToFile = async (img) => {
  const ext = fileExtFromUrl(img.src);
  const res = await fetch(img.src);
  const blob = await res.blob();
  const file = new File([blob], `${img.name}.${ext}`, {
    type: blob.type
  });
  return file;
};

const removeElement = (array, index) => {
  array.splice(index, 1);
  return array;
};

export { uniqueId, imgToFile, fileExtFromUrl, removeElement };
