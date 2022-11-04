
export const fileUpload = async(file) => {

    // if(!file) throw new Error('no tenemos ningun archivo a subir')

    const urlCloudinary = 'https://api.cloudinary.com/v1_1/dokuo9ahu/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(urlCloudinary,{
            method:'POST',
            body: formData,
        })
        if(!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json();


        return cloudResp.secure_url;

    } catch (error) {
        throw new Error(error.message)
    }
}