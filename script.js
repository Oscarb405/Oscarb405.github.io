// --- Animación de aparición al hacer scroll ---

// 1. Seleccionamos todos los elementos que queremos animar
//    Usamos 'querySelectorAll' para obtener una lista de todos los elementos
//    que tengan la clase ".hidden" (definida en el CSS).
const hiddenElements = document.querySelectorAll('.hidden');

// 2. Creamos un 'IntersectionObserver'.
//    Esta es una API moderna del navegador que nos permite "observar" elementos
//    y ejecutar una función (callback) cuando entran o salen de la pantalla.
const observer = new IntersectionObserver((entries) => {
    
    // 'entries' es una lista de los elementos observados que han cambiado.
    entries.forEach((entry) => {
        
        // 'entry.isIntersecting' es 'true' si el elemento está visible en pantalla.
        if (entry.isIntersecting) {
            
            // Si el elemento es visible, le añadimos la clase 'show'.
            // El CSS se encarga de la animación (transición de opacidad y transformación).
            entry.target.classList.add('show');
            
        } else {
            
            // (Opcional) Si queremos que la animación se repita cada vez que
            // salimos y volvemos a entrar, descomentamos la línea de abajo.
            // entry.target.classList.remove('show'); 
        }
    });
}, {
    threshold: 0.1 // El 'callback' se ejecuta cuando al menos el 10% del elemento es visible.
});

// 3. Le decimos al observador qué elementos debe vigilar.
//    Recorremos la lista 'hiddenElements' y le decimos que observe cada uno.
hiddenElements.forEach((el) => observer.observe(el));


// --- (Opcional) Manejo del formulario de contacto ---
// Esto es solo un ejemplo para mostrar que el formulario se "envía".
// En un sitio real, aquí iría el código para enviar los datos a un servidor.

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
    // Evitamos que la página se recargue (comportamiento por defecto del formulario)
    event.preventDefault(); 
    
    // Mostramos un mensaje simple
    alert('¡Gracias por tu mensaje! (Esto es solo una demostración)');
    
    // Limpiamos el formulario
    contactForm.reset();
});