const express = require('express');
const exceljs = require('exceljs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like Excel file)
app.use(express.static(path.join(__dirname)));

app.get('/', async (req, res) => {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile('your_file.xlsx'); // Update with your Excel file name
    const sheet = workbook.worksheets[0];
    const data = [];
    sheet.eachRow((row) => {
        data.push(row.values);
    });
    res.render('index', { data });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});