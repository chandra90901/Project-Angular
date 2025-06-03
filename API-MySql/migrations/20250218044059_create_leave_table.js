/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Leave', function(table) {
        table.increments('Id').primary();
        table.integer('EmployeeId').notNullable();
        table.integer('LeaveTypeId').notNullable();
        table.date('FromDate').notNullable();
        table.boolean('FromDateHalfDay').defaultTo(false);
        table.date('ToDate').notNullable();
        table.boolean('ToDateHalfDay').defaultTo(false);
        table.string('Reason', 250).nullable();
        table.string('Status', 50).nullable();
        table.integer('ApprovedBy').nullable();
        table.string('ApprovedReason', 250).nullable();
        table.date('ApprovedDate').nullable();
        table.integer('RejectedBy').nullable();
        table.string('RejectedReason', 250).nullable();
        table.date('RejectedDate').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Leave');
};
