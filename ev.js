$(document).ready(function() {
    let cartVisible = false;
    let optionsVisible = false;

    // Función para mostrar/ocultar el carrito
    $('#cart-button-1').click(function() {
        if (cartVisible) {
            $('#cart-window').fadeOut(); // Oculta la ventana del carrito
        } else {
            $('#cart-window').fadeIn(); // Muestra la ventana del carrito
        }
        cartVisible = !cartVisible; // Cambia el estado de visibilidad
    });

    // Función para mostrar/ocultar la ventana de opciones
    $('#cart-button-2').click(function() {
        if (optionsVisible) {
            $('#options-window').fadeOut(); // Oculta la ventana de opciones
        } else {
            $('#options-window').fadeIn(); // Muestra la ventana de opciones
        }
        optionsVisible = !optionsVisible; // Cambia el estado de visibilidad
    });

    // Función para mostrar el submenú al pasar el mouse
    $('.menu-item').mouseenter(function() {
        $(this).find('.submenu').slideDown();
    });

    // Función para ocultar el submenú cuando el mouse sale
    $('.menu-item').mouseleave(function() {
        $(this).find('.submenu').slideUp();
    });

    // Evento de búsqueda rápida al hacer clic en el icono de búsqueda
    $('.buscar').click(function() {
        let searchInput = $('#quick-search');
        
        if (!searchInput.length) { // Verifica si el input ya existe
            searchInput = $('<input type="text" id="quick-search" placeholder="Buscar productos...">');
            $('header').append(searchInput);
            
            // Estilo del input flotante
            searchInput.css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '10px',
                border: '1px solid #333',
                zIndex: 1000
            });

            // Evento para filtrar productos al escribir en el input
            searchInput.on('keyup', function() {
                let filter = searchInput.val().toLowerCase();
                $('.product-card').each(function() {
                    let productName = $(this).find('h2').text().toLowerCase();
                    $(this).toggle(productName.includes(filter));
                });
            });
        }
    });

    // Evento para agregar productos al carrito al hacer clic en una imagen de producto
    let cart = [];

    $('.product-card img').click(function() {
        let productCard = $(this).closest('.product-card');
        let productName = productCard.find('h2').text();
        let productPrice = productCard.find('strong').text();
        
        cart.push({ name: productName, price: productPrice });
        updateCart();
    });

    // Función para actualizar el contenido del carrito dinámicamente
    function updateCart() {
        let cartWindow = $('#cart-window');
        cartWindow.html("<h2>Carrito de Compras</h2>");
        
        if (cart.length === 0) {
            cartWindow.append("<p>Tu carrito de compras está vacio!</p>");
        } else {
            let total = 0;
            cart.forEach(function(item) {
                cartWindow.append(`<p>${item.name} - ${item.price}</p>`);
                total += parseFloat(item.price.replace('$', ''));
            });
            cartWindow.append(`<h3>Total: $${total.toFixed(2)}</h3>`);
        }
    }
});

// Código que controla el cambio de tema dinámico y animado
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");

    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");

        // Añadir transición suave al cambiar el tema
        document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";

        // Cambiar la imagen del botón según el tema
        if (document.body.classList.contains("dark-theme")) {
            themeToggle.src = "sol.png"; // Imagen para modo oscuro
        } else {
            themeToggle.src = "luna.png"; // Imagen para modo claro
        }
    });
});


$(document).ready(function() {
    // Mostrar/ocultar la ventana de ayuda con animación al hacer clic en el botón de ayuda
    $('#help-button').click(function() {
        $('#help-window').slideToggle(300); // Animación de deslizamiento (300 ms)
    });

    // Mostrar información sobre "¿Quiénes somos?"
    $('#option-about').click(function(e) {
        e.preventDefault();
        $('#help-content').hide().html('<p>Somos una tienda que se dedica a vender productos 100% mexicanos, inspirados en la cultura local y con diseños únicos. Nuestro objetivo es ofrecer calidad y estilo a nuestros clientes.</p>').fadeIn(300); // Animación suave de fade
    });

    // Mostrar información sobre "¿Cómo agregar un producto al carrito?"
    $('#option-cart').click(function(e) {
        e.preventDefault();
        $('#help-content').hide().html('<p>Para agregar un producto al carrito, solo tienes que hacer clic en la imagen del producto que te guste. Aparecerá en tu carrito y podrás proceder con la compra cuando lo desees.</p>').fadeIn(300); // Animación suave de fade
    });

    // Mostrar información sobre "Te contactamos con un asesor"
    $('#option-contact').click(function(e) {
        e.preventDefault();
        $('#help-content').hide().html('<p>¿Necesitas más ayuda? Llena el siguiente <a href="contacto.html">formulario de contacto</a> y un asesor se pondrá en contacto contigo lo antes posible.</p>').fadeIn(300); // Animación suave de fade
    });
});






let idleTimeout;

function showIdleMessage() {
  const message = document.getElementById('idleMessage');
  message.classList.add('active');
}

function resetIdleTimer() {
  const message = document.getElementById('idleMessage');
  message.classList.remove('active');
  
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(showIdleMessage, 10000); // 10 segundos de inactividad
}

document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keypress', resetIdleTimer);
document.addEventListener('click', resetIdleTimer);

// Iniciar el temporizador por primera vez
resetIdleTimer();
