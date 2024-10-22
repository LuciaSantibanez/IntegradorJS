import { categoriaActiva, setCategoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

// ======== CATEGORIA ========

//Función que filtra los productos según la categoría seleccionada y los renderiza.
const handlerFilterProductsByCategory = (category) => {
    // Obtener la lista de productos desde el localStorage.
    const products = handleGetProductLocalStorage();
    
    if(category === categoriaActiva) return;

    setCategoriaActiva(category);

    let result;

    switch(category) {
        case "hamburguesas":
        case "papas":
        case "gaseosas":
            result = products.filter((el) => el.categoria.toLowerCase() === category);
            break;
        case "mayorPrecio": 
            result = products.sort((a,b) => b.precio - a.precio);
            break;
        
        case "menorPrecio":
            result = products.sort((a,b) => a.precio - b.precio);
            break;

        default:
            result = products;
            break;
    }

    handleRenderList(result);

}

//render de la vista categorias
export const renderCategories = () => {
    const ulList = document.querySelector("#listFilter");
    // Insertar los elementos <li> con las categorías que el usuario puede seleccionar.
    ulList.innerHTML = `
    <li id="todo"> Todos los elementos </li>
    <li id="hamburguesas"> Hamburguesas </li>
    <li id="papas"> Papas </li>
    <li id="gaseosas"> Gaseosas </li>
    <li id="mayorPrecio"> Mayor precio </li>
    <li id="menorPrecio"> Menor precio </li>
    `;
    
    // Seleccionar todos los elementos <li> recién creados dentro del <ul>.
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElem) => {
        liElem.addEventListener("click", () => {
            addLiActiveClass(liElem);
        });
    });

    const addLiActiveClass = (liElem) => {
        handlerFilterProductsByCategory(liElem.id);
        liElements.forEach((liEl) => {
            if(liEl.classList.contains("liActive")) {
                if(liElem !== liEl) {
                    liEl.classList.remove("liActive");
                }
            } else {
                if(liEl === liElem) {
                    liEl.classList.add("liActive");
                }
            }
        })
    }

};