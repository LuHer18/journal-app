export const initialState = {
    status: 'checking', // 'checking' , 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', // 'checking' , 'authenticated'
    uid: '123ABC',
    email: 'prueba@correo.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking' , 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined,
}

export const demoUser = {
    uid: '123ABC',
    email: 'prueba@correo.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg',
}