/**
 * Aroma Celestial Premium - script.js
 * Autor: Gemini (Mejorado)
 * Descripción: Script completo y mejorado para la interactividad avanzada de la web.
 * Funcionalidades: Preloader, Modo Oscuro, Navegación responsive, Menú dinámico,
 * Modales para productos y blog, Carrusel de testimonios con swipe, Animaciones
 * de scroll, Validación de formulario, Notificaciones y un Easter Egg.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN INICIAL Y ELEMENTOS DEL DOM ---
    const body = document.body;
    const header = document.querySelector('.header');
    
    // --- 2. PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('hidden'), 300);
    });

    // --- 3. MODO OSCURO / CLARO ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // --- 4. NAVEGACIÓN (HEADER, HAMBURGER, SCROLL) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    const handleScroll = () => {
        // Header efecto "scrolled"
        header.classList.toggle('scrolled', window.scrollY > 50);
        
        // Botón de volver arriba
        scrollToTopBtn.classList.toggle('show', window.scrollY > 300);

        // Resaltar enlace activo
        let currentSectionId = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - header.offsetHeight) {
                currentSectionId = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(currentSectionId));
        });
    };

    window.addEventListener('scroll', handleScroll);
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- 5. MENÚ DINÁMICO Y MODAL DE PRODUCTO ---
    const menuData = [
        { id: 1, name: 'Espresso Origen Único', price: '2.80€', category: '.\cafe_caliente', image: 'hombre-disfrutando-taza-cafe-caliente-cafe_53876-88441.jpg', description: 'Un shot intenso y aromático de nuestro café de temporada, extraído para resaltar sus notas de cata únicas.', allergens: 'Ninguno', flavorProfile: { Acidez: 80, Cuerpo: 70, Dulzor: 60, Amargor: 40 } },
        { id: 2, name: 'Cappuccino Cremoso', price: '3.50€', category: 'cafe_caliente', image: 'capuccino.jpg', description: 'El equilibrio perfecto entre espresso intenso, leche vaporizada y una capa sedosa de espuma. Ideal para una mañana reconfortante.', allergens: 'Lácteos. Opción de leche vegetal disponible.', flavorProfile: { Acidez: 60, Cuerpo: 85, Dulzor: 75, Amargor: 30 } },
        { id: 3, name: 'Cold Brew Suave', price: '4.20€', category: 'cafe_frio', image: 'coldbrew.jpg', allergens: 'Ninguno', flavorProfile: { Acidez: 30, Cuerpo: 60, Dulzor: 80, Amargor: 20 } },
        { id: 4, name: 'Tarta de Zanahoria Casera', price: '4.80€', category: 'bolleria', image: 'tartazanahoria.jpg', description: 'Bizcocho esponjoso con zanahoria fresca y nueces, cubierto con un frosting de queso crema suave. El acompañante perfecto.', allergens: 'Gluten, lácteos, frutos secos.', flavorProfile: { Acidez: 10, Cuerpo: 70, Dulzor: 90, Amargor: 5 } },
        { id: 5, name: 'Latte Vainilla & Canela', price: '3.90€', category: 'cafe_caliente', image: 'lattevanilla.jpg', description: 'Un abrazo en una taza. Nuestro latte cremoso con sirope de vainilla natural y una pizca de canela.', allergens: 'Lácteos. Opción vegetal disponible.', flavorProfile: { Acidez: 40, Cuerpo: 80, Dulzor: 85, Amargor: 25 } },
        { id: 6, name: 'Iced Caramel Macchiato', price: '4.50€', category: 'cafe_frio', image: 'Caramel-Macchiato.jpg', description: 'Capas deliciosas de leche, espresso y sirope de caramelo, servido sobre hielo. Refrescante y dulce.', allergens: 'Lácteos. Opción vegetal disponible.', flavorProfile: { Acidez: 50, Cuerpo: 70, Dulzor: 90, Amargor: 35 } },
        { id: 7, name: 'Croissant de Almendras', price: '3.00€', category: 'bolleria', image: 'BAKERY-14_-Croissant-de-almendras.jpg', description: 'Croissant artesanal hojaldrado, relleno de una rica crema de almendras y cubierto con almendras laminadas.', allergens: 'Gluten, lácteos, frutos secos.', flavorProfile: { Acidez: 5, Cuerpo: 60, Dulzor: 85, Amargor: 10 } }
    ];
    
    const menuGrid = document.getElementById('menu-grid');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const productModal = document.getElementById('product-modal');
    const productModalBody = document.getElementById('modal-body');

    const displayMenu = (items) => {
        menuGrid.innerHTML = items.map((product, index) => `
            <div class="menu-item zoom-in" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="menu-item-info">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
            </div>
        `).join('');
        observeAnimatedElements(); // Re-observar nuevos elementos
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const filtered = category === 'todos' ? menuData : menuData.filter(p => p.category === category);
            displayMenu(filtered);
        });
    });

    menuGrid.addEventListener('click', e => {
        const item = e.target.closest('.menu-item');
        if (item) {
            const product = menuData.find(p => p.id == item.dataset.productId);
            if (product) openProductModal(product);
        }
    });
    
    const openProductModal = (product) => {
        productModalBody.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="flavor-profile">
                <h4>Perfil de Sabor</h4>
                ${Object.entries(product.flavorProfile).map(([key, value]) => `
                    <div class="flavor-bar">
                        <label>${key}</label>
                        <div class="progress-bar"><div class="progress" data-value="${value}"></div></div>
                    </div>
                `).join('')}
            </div>
            <p class="allergen-info"><strong>Alérgenos:</strong> ${product.allergens}</p>
        `;
        productModal.style.display = 'block';
        setTimeout(() => {
            productModal.querySelectorAll('.progress').forEach(bar => {
                bar.style.width = `${bar.dataset.value}%`;
            });
        }, 150);
    };

    productModal.querySelector('.modal-btn-buy').addEventListener('click', () => {
        showNotification('¡Producto añadido a la cesta!');
        closeModal(productModal);
    });

    // --- 6. BLOG FUNCIONAL Y MODAL DE ARTÍCULO ---
    const blogData = {
        1: { title: "Explorando los Orígenes del Café", author: "Laura G.", date: "15 Marzo, 2025", image: "https://images.unsplash.com/photo-1533035338002-c38d58cf5851?q=80&w=1887&auto=format=fit=crop", content: "<p>Sumérgete con nosotros en un viaje por las regiones cafetaleras más emblemáticas del mundo. Desde las altas montañas de Colombia hasta los exóticos campos de Etiopía, cada origen ofrece un perfil de sabor único y una historia fascinante. El terroir, la altitud y los métodos de procesamiento son solo algunos de los factores que influyen en cada taza.</p><p>En Aroma Celestial, honramos estas diferencias seleccionando cuidadosamente granos que representan lo mejor de cada región, asegurando que cada sorbo te transporte a un lugar diferente. Descubre con nosotros el verdadero significado del café de origen.</p>" },
        2: { title: "El Arte Oculto del Latte Art", author: "Carlos R.", date: "10 Marzo, 2025", image: "https://images.unsplash.com/photo-1507941042781-807e78d22353?q=80&w=1887&auto=format=fit=crop", content: "<p>Más allá del sabor, el arte en tu taza. Nuestro barista principal comparte los secretos para crear diseños impresionantes. El latte art no es solo decoración; es una prueba de la calidad del espresso y la perfecta texturización de la leche. Requiere precisión, práctica y una pasión por el detalle.</p><p>Comenzamos con una base de espresso perfectamente extraído y leche vaporizada hasta alcanzar una microespuma sedosa. A partir de ahí, la muñeca del barista guía el flujo para crear desde un simple corazón hasta un cisne complejo. Es nuestro toque final para hacer tu experiencia aún más especial.</p>" },
        3: { title: "5 Beneficios Sorprendentes del Café", author: "Sofía P.", date: "5 Marzo, 2025", image: "https://images.unsplash.com/photo-1559861616-d3b5b5c9b6b7?q=80&w=1887&auto=format=fit=crop", content: "<p>¿Sabías que tu bebida favorita puede ser también buena para tu salud? Descubre los sorprendentes beneficios que una taza de café de calidad puede aportar a tu día a día, siempre con moderación.</p><p>1. <strong>Rico en Antioxidantes:</strong> El café es una de las mayores fuentes de antioxidantes en la dieta occidental. <br>2. <strong>Mejora el Rendimiento Físico:</strong> La cafeína aumenta los niveles de adrenalina, preparando tu cuerpo para un esfuerzo físico intenso. <br>3. <strong>Estimula la Función Cerebral:</strong> Puede mejorar el estado de ánimo, la memoria y diversas funciones cognitivas. <br>4. <strong>Fuente de Nutrientes:</strong> Contiene vitaminas como la B2, B5 y manganeso. <br>5. <strong>Protección para el Hígado:</strong> Estudios sugieren que el consumo de café puede reducir el riesgo de ciertas enfermedades hepáticas.</p>" }
    };

    const blogGrid = document.querySelector('.blog-grid');
    const blogModal = document.getElementById('blog-modal');
    const blogModalBody = document.getElementById('blog-modal-body');

    blogGrid.addEventListener('click', e => {
        e.preventDefault();
        const link = e.target.closest('.read-more');
        if (link) {
            const post = blogData[link.dataset.postId];
            if (post) openBlogModal(post);
        }
    });

    const openBlogModal = (post) => {
        blogModalBody.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <h3>${post.title}</h3>
            <p class="post-meta">Por ${post.author} | ${post.date}</p>
            <div>${post.content}</div>
        `;
        blogModal.style.display = 'block';
    };

    // --- 7. GESTIÓN GENERAL DE MODALES ---
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.closest('.close-button')) {
                closeModal(modal);
            }
        });
    });
    
    const closeModal = (modal) => {
        modal.style.display = 'none';
        if (modal.id === 'product-modal') productModalBody.innerHTML = '';
        if (modal.id === 'blog-modal') blogModalBody.innerHTML = '';
    };

    // --- 8. CARRUSEL DE TESTIMONIOS CON SWIPE ---
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const nextButton = document.querySelector('.carousel-nav.next');
        const prevButton = document.querySelector('.carousel-nav.prev');
        const dotsNav = document.querySelector('.carousel-dots');
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0, isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0;

        const setSliderPosition = () => carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
        const updateDots = () => dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

        slides.forEach((_, i) => dotsNav.appendChild(document.createElement('button')).classList.add('carousel-dot'));
        const dots = Array.from(dotsNav.children);
        updateDots();

        const moveToSlide = (index) => {
            currentIndex = Math.max(0, Math.min(index, slides.length - 1));
            currentTranslate = currentIndex * -slideWidth;
            prevTranslate = currentTranslate;
            carouselTrack.style.transition = 'transform 0.5s ease-out';
            setSliderPosition();
            updateDots();
        };

        nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));
        dotsNav.addEventListener('click', e => moveToSlide(dots.indexOf(e.target)));

        const dragStart = (e) => {
            isDragging = true;
            startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            carouselTrack.style.transition = 'none';
        };
        
        const drag = (e) => {
            if (!isDragging) return;
            const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
            setSliderPosition();
        };

        const dragEnd = () => {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
            if (movedBy > 100 && currentIndex > 0) currentIndex--;
            moveToSlide(currentIndex);
        };
        
        carouselTrack.parentElement.addEventListener('mousedown', dragStart);
        carouselTrack.parentElement.addEventListener('touchstart', dragStart);
        carouselTrack.parentElement.addEventListener('mousemove', drag);
        carouselTrack.parentElement.addEventListener('touchmove', drag);
        carouselTrack.parentElement.addEventListener('mouseup', dragEnd);
        carouselTrack.parentElement.addEventListener('mouseleave', dragEnd);
        carouselTrack.parentElement.addEventListener('touchend', dragEnd);

        setInterval(() => moveToSlide((currentIndex + 1) % slides.length), 7000);
    }

    // --- 9. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const observeAnimatedElements = () => {
        document.querySelectorAll('.scroll-reveal, .zoom-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
    };

    // --- 10. VALIDACIÓN FORMULARIO DE CONTACTO Y NEWSLETTER ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) isValid = false;
            });
            if (isValid) {
                showNotification('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } else {
                showNotification('Por favor, corrige los errores.', true);
            }
        });

        inputs.forEach(input => input.addEventListener('input', () => validateInput(input)));

        function validateInput(input) {
            let valid = true;
            input.classList.remove('error');
            const errorEl = document.getElementById(`${input.id}-error`);
            errorEl.textContent = '';

            if (input.value.trim() === '') {
                errorEl.textContent = 'Este campo es obligatorio.';
                valid = false;
            } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                errorEl.textContent = 'Por favor, introduce un email válido.';
                valid = false;
            } else if (input.minLength && input.value.length < input.minLength) {
                errorEl.textContent = `Debe tener al menos ${input.minLength} caracteres.`;
                valid = false;
            }

            if (!valid) input.classList.add('error');
            return valid;
        }
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showNotification('¡Gracias por suscribirte!');
            newsletterForm.reset();
        } else {
            showNotification('Por favor, introduce un email válido.', true);
        }
    });

    // --- 11. NOTIFICACIONES (TOAST) ---
    const notificationToast = document.getElementById('notification-toast');
    function showNotification(message, isError = false) {
        notificationToast.textContent = message;
        notificationToast.style.backgroundColor = isError ? 'var(--error-color)' : 'var(--primary-color)';
        notificationToast.classList.add('show');
        setTimeout(() => notificationToast.classList.remove('show'), 3000);
    }

    // --- 12. EASTER EGG (KONAMI CODE) ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const easterEggModal = document.getElementById('easter-egg-modal');
    if (easterEggModal) {
        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex++]) {
                if (konamiIndex === konamiCode.length) {
                    easterEggModal.style.display = 'block';
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
        easterEggModal.querySelector('.easter-egg-btn').addEventListener('click', () => closeModal(easterEggModal));
    }
    
    // --- INICIALIZACIÓN FINAL ---
    displayMenu(menuData); // Carga inicial del menú
    observeAnimatedElements(); // Observador inicial de animaciones
    handleScroll(); // Estado inicial del header y botón scroll
});