/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('CandidateHistory', function(table) {
        table.increments('Id').primary();
        table.integer('CandidateId').notNullable();
        table.string('Remark', 500).notNullable();
        table.date('Date', 100).notNullable();
        table.integer('CreatedBy').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('CandidateHistory');
};
