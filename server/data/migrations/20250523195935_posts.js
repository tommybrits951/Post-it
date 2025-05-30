/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("posts", tbl => {
    tbl.bigIncrements("post_id").primary()
    tbl.bigInteger("author_id").unsigned().references("user_id").inTable("users")
    tbl.string("text")
    tbl.bigInteger("board_id").unsigned().references("board_id").inTable("boards")
    tbl.string("pic")
    tbl.dateTime("posted").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts")
};
