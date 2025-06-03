/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Attendance', function(table) {
      table.increments('Id').primary();
      table.integer('EmployeeId').notNullable();
      table.date('Date').notNullable();
      table.string('InTime', 50).nullable();
      table.string('OutTime', 50).nullable();
      table.string('Status', 50).notNullable();
      table.string('CreatedBy', 255).nullable();
      table.integer('ApprovedBy').nullable();
      table.date('ApprovedDate').nullable();
      table.text('ApprovedReason').nullable();
      table.integer('RejectBy').nullable();
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
exports.down = function(knex) {
    return knex.schema.dropTable('Attendance');
};
