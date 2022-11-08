export default (db) =>
({
  read(id) {
    return db('country').read(id);
  },

  find(mask) {
    const sql = 'SELECT * from country where name like $1';
    return db('country').query(sql, [mask]);
  },
});
