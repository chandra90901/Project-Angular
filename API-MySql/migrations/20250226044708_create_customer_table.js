/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Customer', function(table) {
        table.increments('Id').primary();
        table.string('Title',50).notNullable();
        table.string('CustomerName',200).notNullable();
        table.integer('EntityTypeId').notNullable();
        table.string('Email',200).notNullable();
        table.string('MobileNumber',50).nullable();
        table.string('CustomerGSTIN',50).nullable();
        table.integer('FillingStatusId').nullable();
        table.string('BranchName',200).nullable();
        table.string('DisplayName',200).nullable();
        table.string('PhoneNumber',50).nullable();
        table.string('Fax',50).nullable();
        table.string('AccountNumber',50).nullable();
        table.string('AccountName',200).nullable();
        table.integer('BankId').nullable();
        table.string('IfscCode',50).nullable();
        table.integer('AccountTypeId').nullable();
        table.string('BankingBranchName',200).nullable();
        table.string('Address1',400).nullable();
        table.string('Address2',400).nullable();
        table.string('City',200).nullable();
        table.string('Pincode',10).nullable();
        table.integer('StateId').nullable();
        table.integer('CountryId').nullable();
        table.string('AccountBranchName',200).nullable();
        table.string('AccountGstin',50).nullable();
        table.string('AccountEMail',50).nullable();
        table.string('AccountMobileNumber',20).nullable();    
        table.string('ShippingAddress1',200).nullable();
        table.string('ShippingAddress2',200).nullable();
        table.string('ShippingCity',100).nullable();
        table.string('ShippingPincode',10).nullable();
        table.integer('ShippingStateId').nullable();
        table.integer('ShippingCountryId').nullable();
        table.string('ShippingBranchName',100).nullable();
        table.string('ShippingGstin',50).nullable();
        table.string('ShippingEMail',100).nullable();
        table.string('ShippingMobileNumber',20).nullable();    
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Customer');
};
