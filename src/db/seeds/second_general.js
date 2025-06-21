require('dotenv').config();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    const googleIds = process.env.GOOGLE_ID.split(',').map(id => id.trim()).map(element => ({'google_id': element}));
    await knex('sheets').del();
    await knex('sheets').insert(googleIds);
};
