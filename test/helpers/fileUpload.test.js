import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dh06hxbji',
    api_key: '196944965167368',
    api_secret: 'KoFIv-GRB-I_mGtQjxvfxAnbn-A',
    secure: true,
});

describe('Pruebas en el fileUpload', () => { 
    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPj0_5EoGiIMV6OrTzVOOXERz2PnL0dwy0aQ&usqp=CAU';

        const resp = await fetch(imageUrl)
        const blob = await resp.blob();
        const file = new File([blob], 'paisaje.jpg');

        const url = await fileUpload(file);

        expect(typeof url).toBe("string");
        /* console.log(url) */
        const segments = url.split('/')
        const imageId = segments[segments.length-1].replace('.jpg', '');
        await cloudinary.api.delete_resources(['journal/'+ imageId], {resource_type: 'image'});
    })

    test('debe de retornar null', async() => { 
        
        const file = new File([], 'paisaje.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null)
     })
 })