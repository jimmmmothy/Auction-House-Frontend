import axios from 'axios';

const UploadImages = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "s3-auction-images")
    formData.append("folder", "auction-house")

    return axios.post("https://api.cloudinary.com/v1_1/dh6p9hese/image/upload", formData)
        .then(res => {
            console.log(res);
            return res.data.secure_url as string;
        })
        .catch(err => {
            console.log(err);
            return "Something went wrong!";
        })
}

export default {
    UploadImages
}