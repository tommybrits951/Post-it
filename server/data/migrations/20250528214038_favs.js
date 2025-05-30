/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("favs", tbl => {
    tbl.bigIncrements("fav_id").primary()
    tbl.bigInteger("user_id").unsigned().references("user_id").inTable("users")
    tbl.bigInteger("board_id").unsigned().references("board_id").inTable("boards")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("favs")
};
