/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("boards", tbl => {
    tbl.bigIncrements("board_id").primary()
    tbl.string("subject").notNullable()
    tbl.string("pic")
    tbl.dateTime("started").notNullable()
    tbl.bigInteger("author_id").unsigned().references("user_id").inTable("users")
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("boards")
};
