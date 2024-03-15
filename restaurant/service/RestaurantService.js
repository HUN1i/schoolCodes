// const { Todo } = require('../model');

const pool = require('../model/database');

class RestaurantService {
  findAll() {
    const result = pool.query('select * from restaurant');
    return result;
  }

  async post(restaurant) {
    const user = await pool.query(
      `select * from user where name = "${restaurant.name}"`
    );
    if (user[0].length === 0) {
      await pool.query(
        `insert into user(name, email, phone) values ("${restaurant.name}", "${restaurant.email}", "${restaurant.phone}")`
      );
    }

    pool.query(
      `insert into Reservation(name, phone, num_guests, date_time, restaurant_id) values` +
        `("${restaurant.name}", "${restaurant.phone}", ${restaurant.num_guests}, "${restaurant.date}", ${restaurant.restaurant_id})`
    );
    return;
  }
  async destroy(id) {
    const user = await pool.query(
      `select name from Reservation where id = ${id}`
    );
    const names = user[0].map((item) => item.name);
    pool.query(`delete from Reservation where id = ${id}`);
    return names;
  }

  findRes() {
    const result = pool.query(`select * from Reservation`);
    return result;
  }
  findByUser(name) {
    const result = pool.query(
      `select * from Reservation where name = "${name}"`
    );
    return result;
  }
}

module.exports = RestaurantService;
