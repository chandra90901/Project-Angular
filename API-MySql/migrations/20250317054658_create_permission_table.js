/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Permission', function (table) {
        table.increments('Id').primary(); // Create an auto-incrementing primary key
        table.integer('RoleId').notNullable();
        table.integer('ModuleId').notNullable();
        table.boolean('View').defaultTo(false);
        table.boolean('Modify').defaultTo(false);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Permission');
};
