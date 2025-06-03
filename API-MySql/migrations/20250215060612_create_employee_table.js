/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Employee', function (table) {
        table.increments('Id').primary();
        table.string('Title', 10).notNullable()
        table.string('EmployeeName', 200).notNullable();
        table.integer('EmployeeStatusId').nullable();
        table.integer('ReportingTo').nullable();
        table.integer('GenderId').nullable();
        table.integer('MaritalStatusId').nullable();
        table.integer('BranchId').nullable();
        table.string('OfficeEmail', 200).nullable();
        table.string('OfficeMobileNumber', 100).nullable();
        table.string('EmployeeId',50).nullable();
        table.string('PersonalMobileNumber', 100).nullable();
        table.string('PersonalEmail', 100).nullable();
        table.date('DateOfBirth').nullable();
        table.integer('DesignationId').nullable();
        table.integer('DepartmentId').nullable();
        table.string('FatherName', 200).nullable();
        table.string('MotherName', 200).nullable();
        table.integer('EmployementTypeId').nullable();
        table.string('Aadhar', 100).nullable();
        table.string('PAN', 100).nullable();
        table.integer('ReligionId').nullable();
        table.integer('BloodGroupId').nullable();
        table.string('EmergencyContact', 100).nullable();
        table.string('UAN', 50).nullable();
        table.string('ESI', 50).nullable();
        table.date('DateOfJoining').nullable();
        table.string('CheckInTime', 50).nullable();
        table.string('CheckOutTime', 50).nullable();
        table.date('DateOfExit').nullable();
        table.string('AccountName', 500).nullable();
        table.string('PresentAddressLine1', 250).nullable();
        table.string('PresentAddressLine2', 250).nullable();
        table.string('PresentAddressCity', 100).nullable();
        table.string('PresentAddressPincode', 10).nullable();
        table.integer('PresentAddressStateId').nullable();
        table.integer('PresentAddressCountryId').nullable();
        table.boolean('IsPermannentSameAsPresent').nullable();
        table.string('PermanentAddressLine1', 250).nullable();
        table.string('PermanentAddressLine2', 250).nullable();
        table.string('PermanentAddressCity', 100).nullable();
        table.string('PermanentAddressPincode', 10).nullable();
        table.integer('PermanentAddressStateId').nullable();
        table.integer('PermanentAddressCountryId').nullable();
        table.integer('BankAccountNumber').nullable();
        table.string('BankAccountName',100).nullable();
        table.integer('BankId').nullable();
        table.string('BankIfscCode',100).nullable();
        table.integer('BankAccountTypeId').nullable();
        table.string('BankBrachName',250).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Employee');
};
