// ======== LOCALSTORAGE ========

//Función que obtiene los productos almacenados en el LocalStore
export const handleGetProductLocalStorage = () => {
    //obtener los productos desde el localStorage y convertirlos de formato JSON a un objeto JavaScript
    const products = JSON.parse(localStorage.getItem("products"));
    //verificar si hay productos almacenados
    //si los hay devuelve el array de productos, si no un array vacío.
    return products ? products : [];
}

//Función para guardar o actualizar un producto en el localStorage
export const setInLocalStorage = (productIn) => {
    //obtener los productos actuales almacenados en el localStorage
    let productInLocal = handleGetProductLocalStorage();
    // Verificar si el producto ya existe en el LocalStorage buscando su ID.
    const existingIndex = productInLocal.findIndex((productLocal) => 
        productLocal.id === productIn.id
    );

    if(existingIndex === -1) {
        productInLocal.push(productIn); //si el producto no existe, agregarlo al array
    } else {
        productInLocal[existingIndex] = productIn;
    }

    // Guardar el array de productos actualizado en el LocalStorage, convirtiéndolo de objeto a formato JSON.
    localStorage.setItem("products", JSON.stringify(productInLocal))

}