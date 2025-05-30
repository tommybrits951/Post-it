/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('favs').del()
  await knex('favs').insert([
    { user_id: 1, board_id: 1},
    { user_id: 1, board_id: 2},
    { user_id: 1, board_id: 3},
    { user_id: 1, board_id: 4},
    { user_id: 1, board_id: 5},
  ]);
};
