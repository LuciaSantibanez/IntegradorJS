import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

// ======== POPUP ========
const btnCancel = document.querySelector("#cancelBtn");

btnCancel.addEventListener("click", () => {
    closeModal();
})


// ======= FUNCIÓN PARA ABRIR EL MODAL =======
export const openModal = () => {
    // Mostrar el modal
    const modal = document.querySelector("#modalPopUp");
    modal.style.display = 'flex';

    // Mostrar o ocultar el botón de eliminar según si hay un producto activo.
    const btnDelete = document.querySelector("#deleteBtn");
    
    if(productoActivo) {
        btnDelete.style.display = 'block';
    }else{
        btnDelete.style.display = 'none';
    }

    // Si hay un producto activo, cargar los datos en los campos del modal.
    if(productoActivo) {
        const nombre = document.querySelector("#nombre");
        const img = document.querySelector("#img");
        const precio = document.querySelector("#precio");
        const categoria = document.querySelector("#categoria");
        
        nombre.value = productoActivo.nombre;
        categoria.value = productoActivo.categoria;
        img.value = productoActivo.img;
        precio.value = productoActivo.precio;
    }    
}

// ======= FUNCIÓN PARA CERRAR EL MODAL =======
export const closeModal = () => {
    const modal = document.querySelector("#modalPopUp");
    modal.style.display = 'none';
    setProductoActivo(null);
    resetModal();
}

// ======= FUNCIÓN PARA RESETEAR EL MODAL =======
const resetModal = () => {
    const nombre = document.querySelector("#nombre");
    const img = document.querySelector("#img");
    const precio = document.querySelector("#precio");
    const categoria = document.querySelector("#categoria");
    
    nombre.value = '';
    img.value = '';
    precio.value = 0;
    categoria.value = 'Seleccione una categoria';
};

// ======= EVENTO PARA ELIMINAR PRODUCTO =======
const btnDelete = document.querySelector("#deleteBtn");
btnDelete.addEventListener("click", () => {
    handleBtnDelete();
});

const handleBtnDelete = () => {
    handleDeleteProduct();
};