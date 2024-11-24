const form = document.getElementById('employeeForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const employee = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        id: document.getElementById('id').value,
        salary: document.getElementById('salary').value,
        department: document.getElementById('department').value,
        email: document.getElementById('email').value,
    };

    fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
});
