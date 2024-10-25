
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name.length < 2 || subject.length < 2 || message.length < 2) {
        alert('Por favor, asegúrate de que todos los campos tengan al menos 2 caracteres.');
        event.preventDefault();
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, introduce una dirección de correo válida.');
        event.preventDefault();
    }

    const data = [
        { Nombre: name, "Correo Electrónico": email, Asunto: subject, Mensaje: message }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contactos");

    XLSX.writeFile(workbook, "contactos.xlsx");
});
