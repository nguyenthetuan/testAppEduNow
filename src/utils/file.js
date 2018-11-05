import EXIF from 'exif-js/exif';

export const correctImageOrientation = data => {
  const correctOrientation = (ctx, orientation, width, height) => {
    switch (orientation) {
      case 3:
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 6:
        ctx.translate(height, 0);
        ctx.rotate(0.5 * Math.PI);
        break;
      case 8:
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
      default:
        break;
    }
  };

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      EXIF.getData(img, () => {
        const allMetaData = EXIF.getAllTags(this);
        if (allMetaData.Orientation === 6 || allMetaData.Orientation === 8) {
          canvas.width = this.naturalHeight;
          canvas.height = this.naturalWidth;
        }
        correctOrientation(ctx, allMetaData.Orientation, this.naturalWidth, this.naturalHeight);
        ctx.drawImage(img, 0, 0, this.naturalWidth, this.naturalHeight);
        ctx.save();
        resolve(canvas.toDataURL('image/jpeg'));
      });
    };
    img.setAttribute('src', data);
  });
};

export const getFileBase64 = file =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      correctImageOrientation(fileReader.result).then(convertedData => resolve(convertedData));
    };
    fileReader.onerror = error => reject(error);
    fileReader.readAsDataURL(file);
  });

export const getImageBase64KeepFileType = file =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
