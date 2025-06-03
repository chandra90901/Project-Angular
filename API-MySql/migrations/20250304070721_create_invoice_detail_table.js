/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Invoice_Detail', function(table) {
        table.increments('Id').primary();
        table.integer('Invoice_Id').notNullable();
        table.integer('Product_Id').notNullable();
        table.string('Description',255).notNullable();
        table.integer('Quantity').notNullable();
        table.decimal('Unit_Price',(10,2)).notNullable();
        table.decimal('Total_Price',(10,2)).notNullable();
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
    return knex.schema.dropTable('Invoice_Detail');
};
