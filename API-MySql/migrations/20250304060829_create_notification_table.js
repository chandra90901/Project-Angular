/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Notification', function(table) {
        table.increments('Id').primary();
        table.integer('GroupId').notNullable();
        table.integer('EmployeeId').notNullable();
        table.string('Message',1000).nullable();
        table.string('Status',50).nullable();
        table.date('FromDate').nullable();
        table.date('ToDate').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Notification');
};
