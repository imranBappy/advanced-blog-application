const findImageId = (url: string): string => {
const imageId = url.split('/').slice(-2).join('/').split('.').slice(0, -1).join('.');
    return imageId;
}

export default findImageId;