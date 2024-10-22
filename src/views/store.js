import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage"
import { openModal } from "./modal";

// ======== STORE ========
export const handleGetProductToStore = () => {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
}

export const handleRenderList = (products) => {
    const buguers = products.filter((el) => el.categoria === "Hamburguesas");
    const papas = products.filter((el) => el.categoria === "Papas");
    const gaseosas = products.filter((el) => el.categoria === "Gaseosas");

    const renderProductGroup = (products, title) => {
        if(products.length === 0) return "";
       
        const productsHTML = products.map((product, index) => {
            return `
                <div 
                    class = "containerTargetItem"
                    id="product-${product.categoria}-${index}">
                    <div>
                        <img src =${product.img}>
                        <div>
                            <h2> ${product.nombre}
                        </div>
                        <div class="targetProps">
                            <p> <b>Precio:</b> $ ${product.precio}</p>
                        </div>
                    </div>
                </div>
            `
        });

        return `
            <section class="sectionStore">
                <div class="containerTitleSection">
                    <h3>${title}</h3>
                </div>
                <div class="containerProductStore">
                    ${productsHTML.join("")}
                </div>
            </section>
        `;
    };

    const appContainer = document.querySelector("#storeContainer");
    appContainer.innerHTML = `
        ${renderProductGroup(buguers, "Hamburguesas")}
        ${renderProductGroup(papas, "Papas")}
        ${renderProductGroup(gaseosas, "Gaseosas")}

    `;

    const addEvent = (products) => {
        if(products.length === 0) return;

        products.forEach((product, index) => {
            const productContainer = document.querySelector(`#product-${product.categoria}-${index}`);
            productContainer.addEventListener("click", () => {
                setProductoActivo(product);
                openModal();
            })
        });         
    };

    addEvent(buguers);
    addEvent(papas);
    addEvent(gaseosas);
    
};