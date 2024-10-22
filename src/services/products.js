
import Swal from 'sweetalert2';

import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductToStore, handleRenderList } from "../views/store";

// ======== PRODUCT ========

// Obtener el botón de "Aceptar" del modal.
const btnAccept = document.querySelector("#acceptBtn");

// Añadir evento de clic al botón "Aceptar" que ejecuta la función de guardar o modificar producto.
btnAccept.addEventListener("click", () => {
    console.log("here");
    handleSaveOrModifyElements();
})

const handleSaveOrModifyElements = () => {
    const nombre = document.querySelector("#nombre").value;
    const img = document.querySelector("#img").value;
    const precio = document.querySelector("#precio").value;
    const categoria = document.querySelector("#categoria").value;

    let obj = null;

    if(productoActivo) {
        obj = {
            ...productoActivo,
            nombre,
            img,
            precio,
            categoria,
        };
    } else {
        obj = {
            id:new Date().toISOString(),
            nombre,
            img,
            precio,
            categoria,
        };
    }

    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado exitosamente!",
        icon: "success"
      });

    setInLocalStorage(obj);
    handleGetProductToStore();
    closeModal();
}

//eliminar elemento
export const handleDeleteProduct = () => {

    Swal.fire({
        title: "Estás seguro que deseas eliminar este elemento?",
        text: "No podrás revertir esta accion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            localStorage.setItem("products", JSON.stringify(result));
            const newproducts = handleGetProductLocalStorage();
            handleRenderList(newproducts);
            closeModal();
        } else{
            closeModal();
        }
        
      });


    
};