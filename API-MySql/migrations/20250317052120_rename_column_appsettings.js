/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('AppSettings', function(table) {
        table.renameColumn('CompanyName', 'Property');
        table.renameColumn('CopyrightMessage', 'Value');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('AppSettings', function(table) {
        table.renameColumn('Property', 'CompanyName');
        table.renameColumn('Value', 'CopyrightMessage');
    });
};
