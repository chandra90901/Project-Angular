/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('Role', function (table) {
        table.increments('Id').primary(); // Create an auto-incrementing primary key
        table.string('roleName', 100).notNullable().unique(); // Role name should be a string, unique
        table.string('roleStatus', 100).notNullable();
        table.string('adminName', 50).notNullable();
        table.boolean('isAdmin').defaultTo(false); // Ensure default value
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('Role');
};
