const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const body = document.querySelector('body');

// Función para activar o desactivar el menú
const toggleMenu = () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    
    // Añadimos o quitamos la clase 'no-scroll' al body para desactivar el scroll
    if (nav.classList.contains('nav-active')) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
};

// Evento para abrir/cerrar el menú al hacer clic en el icono de hamburguesa
burger.addEventListener('click', toggleMenu);

// Evento para cerrar el menú cuando se presiona ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && nav.classList.contains('nav-active')) {
        toggleMenu();
    }
});
