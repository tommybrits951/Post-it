/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.bigIncrements("user_id").primary()
    tbl.string("username").notNullable().unique()
    tbl.string("email").notNullable().unique()
    tbl.string("firstName").notNullable()
    tbl.string("lastName").notNullable()
    tbl.string("password").notNullable()
    tbl.bigInteger("phone").notNullable().unique()
    tbl.string("pic").defaultTo("profile.png")
    tbl.dateTime("joined").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
