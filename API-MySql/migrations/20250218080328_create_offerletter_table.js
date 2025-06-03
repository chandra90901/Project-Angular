/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('OfferLetter', function(table) {
        table.increments('Id').primary();
        table.date('Date').notNullable();
        table.string('CandidateName',100).notNullable();
        table.string('JobTitle', 200).notNullable();
        table.string('Department',100).notNullable();
        table.string('ReportingManager',200).notNullable();
        table.string('EmploymentType', 100).notNullable();
        table.string('WorkLocation',100).notNullable();
        table.integer('ProbationPeriod').notNullable();
        table.date('Deadline').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('OfferLetter');
};
