export const getSize = async (src) => {
  const fileImg = await fetch(src).then((r) => r.blob());
  return Math.round(fileImg.size * 0.001);
};

export const getBlob = async (src) => {
  const fileImg = await fetch(src).then((r) => r.blob());
  return fileImg;
};
