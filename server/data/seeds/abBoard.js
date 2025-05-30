/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('boards').del()
  await knex('boards').insert([
    { subject: "Whuch ya wanna talk about?", pic: "board.png", started: "2024-07-14 12:21:55", author_id: 1 },
    { subject: "Topic ideas to talk about", pic: "board.png", started: "2024-07-14 12:21:55", author_id: 1 },
    { subject: "Topic1", pic: "board.png", started: "2024-07-14 12:21:55", author_id: 1 },
    {subject: "subject1", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 2},
    {subject: "subject2", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 2},
    {subject: "subject3", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 2},
    {subject: "subject4", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 1},
    {subject: "subject5", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 1},
    {subject: "subject6", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 3},
    {subject: "subject7", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 3},
    {subject: "subject8", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 4},
    {subject: "subject9", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 5},
    {subject: "subject10", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 4},
    {subject: "subject11", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 5},
    {subject: "subject12", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 4},
    {subject: "subject13", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 1},
    {subject: "subject14", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 1},
    {subject: "subject15", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 3},
    {subject: "subject16", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 5},
    {subject: "subject17", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 3},
    {subject: "subject18", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 3},
    {subject: "subject19", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 2},
    {subject: "subject21", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 6},
    {subject: "subject20", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 6},
    {subject: "subject22", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 7},
    {subject: "subject23", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 7},
    {subject: "subject24", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 9},
    {subject: "subject25", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 10},
    {subject: "subject26", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 11},
    {subject: "subject27", pic: "board.png", started: "2024-09-09 12:00:00", author_id: 12},
  ]);
};
