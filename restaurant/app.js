const express = require('express');
const http = require('http');
const app = express();
const pool = require('./model/database');
const RestaurantService = require('./service/RestaurantService');
const dirname = __dirname + '/view';

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './view');
pool.getConnection();
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);

const restaurantService = new RestaurantService();

app.get('/', async function (req, res) {
  const restaurants = await restaurantService.findAll();
  res.render(dirname + '/index.ejs', { restaurants: restaurants[0] });
});
app.post('/', async (req, res) => {
  let rest;
  const dto = req.body;
  restaurantService.post(dto);

  setTimeout(async function () {
    rest = await restaurantService.findByUser(dto.name);
    res.render(dirname + '/manage_reservations.ejs', {
      reservations: rest[0],
    });
  }, 100);
});

app.get('/manage', async function (req, res) {
  const reservations = await restaurantService.findRes();
  res.render(dirname + '/manage_reservations.ejs', {
    reservations: reservations[0],
  });
});

app.get('/cancel_reservation/:id', async (req, res) => {
  const { id } = req.params;
  let rest;
  const result = await restaurantService.destroy(id);
  setTimeout(async function () {
    rest = await restaurantService.findByUser(result);
    res.render(dirname + '/manage_reservations.ejs', {
      reservations: rest[0],
    });
  }, 100);
});

server.listen('3001', 'localhost', () => {
  console.log(`Server running at http://localhost:3001`);
});
