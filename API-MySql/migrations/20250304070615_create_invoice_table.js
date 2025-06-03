/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Invoice', function(table) {
        table.increments('Id').primary();
        table.integer('Invoice_number',50).notNullable();
        table.integer('Customer_Id').notNullable();
        table.dateTime('Invoice_Date').notNullable();
        table.dateTime('Due_Date').notNullable();
        table.decimal('Total_Amount',(10,2)).notNullable();
        table.string('Status',20).nullable();
        table.decimal('Tax',(10,2)).nullable();
        table.decimal('Discount',(10,2)).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Invoice');
};
