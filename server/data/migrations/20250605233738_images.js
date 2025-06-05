/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("images", tbl => {
    tbl.bigIncrements("image_id").primary()
    tbl.bigInteger("post_id").unsigned().references("post_id").inTable("posts")
    tbl.string("path").notNullable()
    tbl.dateTime("uploaded").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("images")
};
