/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Announcement', function(table) {
        table.increments('Id').primary();
        table.string('Title', 50).nullable();
        table.string('Description', 255).nullable();
        table.integer('EmployeeId').notNullable();
        table.date('FromDate').notNullable();
        table.date('ToDate').notNullable();
        table.string('Status', 50).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Announcement');
};
