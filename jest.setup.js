import 'whatwg-fetch'; 
import { getEnvironments } from './src/helpers';


require('dotenv').config({
    path: '.env.test',
})

jest.mock('./src/helpers', ()=> ({
    getEnvironments: ()=> ({...process.env})
}));