/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('User', function(table) {
        table.increments('Id').primary();
        table.string('Username', 100).notNullable();
        table.string('Password', 100).notNullable();
        table.integer('EmployeeId').notNullable();
        table.integer('RoleId').notNullable();
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
    return knex.schema.dropTable('User');
};
