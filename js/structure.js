//Clique fora do menu de navegação fecha o menu de navegação
const menuBkg = document.querySelector(".menu-bkg");
const checkbox = document.getElementById("menu-checkbox");
menuBkg.addEventListener("click", ()=>{
    checkbox.checked = false;
})

const botoesMenu = document.querySelectorAll("[data-botao]");
const modalContainer = document.querySelector(".modal-container");
const modalBkg = document.querySelector(".modal-bkg")
const modais = document.querySelectorAll("[data-modal]");
const closeModal = document.querySelector(".x");
const confirmar = document.getElementById("confirmar")

//clique fora do modal para fechar o modal
modalBkg.addEventListener("click", ()=>{
    modalContainer.classList.add("inativo");
})

closeModal.addEventListener("click", ()=>{
    modalContainer.classList.add("inativo");
})

confirmar.addEventListener("click", () => {
    modalContainer.classList.add("inativo");
})

//clique em botão no menu de navegação abre modal
botoesMenu.forEach(botaoMenu => botaoMenu.addEventListener("click", ()=>{
    const valor = botaoMenu.dataset.botao;
    modalContainer.classList.remove("inativo");
    checkbox.checked = false;
    ativarConteudoModal(valor);
}))

//ativar a guia certa de modal
const ativarConteudoModal = (valor) => {
    const conteudo = document.querySelector(`[data-modal="${valor}"]`);
    modais.forEach(modal => modal.classList.add("inativo"));
    conteudo.classList.remove("inativo");
}
