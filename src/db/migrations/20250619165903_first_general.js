/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return (
  knex.schema.createTableIfNotExists('rates', function(table){
    table.increments('id').primary();
    table.string('date').notNullable();
    table.string('dtNextBox').notNullable();
    table.string('dtTillMax').notNullable();
  })
  ).then(()=>{return (

  knex.schema.createTableIfNotExists('warehouseList', function(table){
    table.increments('id').primary();
    table.integer('rate_id').unsigned().notNullable();
    table.string('boxDeliveryAndStorageExpr').notNullable();
    table.string('boxDeliveryBase').notNullable();
    table.string('boxDeliveryLiter').notNullable();
    table.string('boxStorageBase').notNullable();
    table.string('boxStorageLiter').notNullable();
    table.string('warehouseName').notNullable();

    table.foreign('rate_id').references('id').inTable('rates').onDelete('CASCADE');
  })
  )}).then(()=>{return(
  knex.schema.createTableIfNotExists('sheets', function(table){
    table.increments('id').primary();
    table.string('google_id').notNullable();
  })
  )});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('warehouseList')
    .then(()=> knex.schema.dropTableIfExists('sheets'))
    .then(()=> knex.schema.dropTableIfExists('rates'));
};
