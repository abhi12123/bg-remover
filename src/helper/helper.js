
export const getBlob = async (src) => {
  const fileImg = await fetch(src).then((r) => r.blob());
  return fileImg;
};
