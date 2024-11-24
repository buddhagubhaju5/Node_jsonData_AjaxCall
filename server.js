const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const filePath = './employeeData.json';

app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;

        let employees = JSON.parse(data || '[]');
        const index = employees.findIndex(emp => emp.id === newEmployee.id);

        if (index !== -1) {
            employees[index] = newEmployee; // Update existing record
        } else {
            employees.push(newEmployee); // Add new record
        }

        fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {
            if (err) throw err;
            res.status(200).json({ message: 'Employee data updated successfully!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
