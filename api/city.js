export default (db, logger) =>
({
  read(id) {
    logger.log(id);
    return db('city').read(id);
  },

  async create({ name }) {
    return db('city').create({ name });
  },

  async update(id, { name }) {
    return db('city').update(id, { name });
  },

  delete(id) {
    return db('city').delete(id);
  },

  find(mask = '%%') {
    const sql = 'SELECT login from city where login like $1';
    return db('city').query(sql, [mask]);
  },
});
