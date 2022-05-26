const GOOGLE_API_KEY = 'AIzaSyC_ou7AOdt86KhF3iBWFWEeCQ4us0aT5cg'
const GOOGLE_SIGNATURE = '3es21yPvyOUq0V4kpPQ0fGOT8i0='

export function getMapPreview(lat, lng) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=AIzaSyC_ou7AOdt86KhF3iBWFWEeCQ4us0aT5cg`
    return imagePreviewUrl;
}
