/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Candidate', function(table) {
        table.increments('Id').primary();
        table.string('CandidateName', 100).notNullable();
        table.string('EmailAddress', 200).notNullable();
        table.string('PhoneNumber', 100).nullable();
        table.string('SkillSet', 500).nullable();
        table.string('AadharCardNumber', 100).nullable();
        table.string('PanCardNumber', 100).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Candidate');
};
