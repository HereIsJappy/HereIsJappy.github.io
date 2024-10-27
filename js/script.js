document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name.length < 2 || subject.length < 2 || message.length < 2) {
        alert('Por favor, asegúrate de que todos los campos tengan al menos 2 caracteres.');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce una dirección de correo válida.');
        return;
    }

    const formData = {
        name,
        email,
        subject,
        message
    };

    try {
        await fetch('http://localhost:3000/enviar-correo', { // Cambia esta URL al endpoint de tu servidor
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        alert('Formulario enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el formulario', error);
        alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
    }

    function mostrarSeccion(id) {
        document.querySelectorAll('.seccion').forEach(seccion => {
            seccion.classList.remove('activa');
        });
        document.getElementById(id).classList.add('activa');
    }
});

