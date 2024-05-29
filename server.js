const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,        // MySQL host
  user: process.env.DB_USER,        // MySQL user
  password: process.env.DB_PASS,    // MySQL password
  database: process.env.DB_NAME     // MySQL database
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/cars', (req, res) => {
    const query = 'SELECT * FROM Cars';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
      }
    });
  });

app.use(express.static('public'));


const twig = require('twig');
app.set('view engine','twig');

app.get('/', (req, res) => {
  res.render("index")
})
app.get('/reservation', (req, res) => {
  res.render("reservation")
})
app.get('/car', (req, res) => {
  res.render("car")
})
app.get('/shop', (req, res) => {
  res.render("shop")
})


app.post('/getCars', (req, res) => {
  db.query('SELECT * FROM Cars', (err, results) => {
      if (err) {
          console.error('MySQL query error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json({ cars: results });
          console.log(results);
      }
  });
});

app.use(bodyParser.json());

app.post('/reserv', (req, res) => {
  const {Model, Make, Year, Transmission, RentalFee, Available, CurrentMileage } = req.body;
  
  if (!Model || !Make || !Year || !Transmission || !RentalFee || !Available || !CurrentMileage) {
    res.status(400).send('Bad Request: Missing required fields');
    return;
  }

  db.query('INSERT INTO Cars (Model, Make, Year, Transmission, RentalFee, Available, ShopID, CurrentMileage) VALUES (?, ?, ?, ?, ?, ?, 1, ?);', [Model, Make, Year, Transmission, RentalFee, Available, CurrentMileage], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(results);
      res.status(200).send('Car reserved successfully');
    }
  });
});

app.delete('/DeleteCar', (req, res) => {
  const { plate } = req.query;

  const deleteQuery = 'DELETE FROM Cars WHERE CarID = ?';

  db.query(deleteQuery, [plate], (err, result) => {
      if (err) {
          console.error('MySQL query error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Car deleted successfully' });
      } else {
          res.status(404).json({ error: 'Car not found' });
      }
  });
});

app.post('/ChangeAvailability', (req, res) => {
  const { carID, availability } = req.query;

  db.query('UPDATE Cars SET Available = ? WHERE CarID = ?', [availability, carID], (error, results) => {
      if (error) {
          console.error('MySQL query error:', error);
          res.status(500).send('Internal Server Error');
      } else {
          console.log(results);
          res.status(200).json({ message: 'Availability changed successfully' });
      }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});