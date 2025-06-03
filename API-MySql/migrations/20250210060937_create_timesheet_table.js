/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Timesheet', function (table) {
    table.increments('Id').primary();
    table.string('EmployeeId', 50).notNullable();
    table.date('Date').notNullable();
    table.string('Hours', 50).nullable();
    table.string('WorkDetails', 500).nullable();
    table.string('Status', 50).notNullable();
    table.string('CreatedBy', 50).nullable();
    table.string('ApprovedBy', 50).nullable();
    table.date('ApprovedDate').nullable();
    table.text('ApprovedReason').nullable();
    table.string('RejectBy', 50).nullable();
    table.date('RejectDate').nullable();
    table.text('RejectReason').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Timesheet');
};
