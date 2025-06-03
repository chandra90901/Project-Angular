const { db } = require("../db");

exports.createInvoice = async (invoiceData) => {
    console.log(invoiceData)
    const {
        Invoice_number,
        Customer_Id,
        Invoice_Date,
        Due_Date,
        Total_Amount,
        Status,
        Tax,
        Discount

    } = invoiceData;
    const [result] = await db.query(
        `INSERT INTO Invoice (
        Invoice_number,
        Customer_Id,
        Invoice_Date,
        Due_Date,
        Total_Amount,
        Status,
        Tax,
        Discount
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
        Invoice_number,
        Customer_Id,
        Invoice_Date,
        Due_Date,
        Total_Amount,
        Status,
        Tax,
        Discount
        ]
    );

    return result.insertId;
};

exports.getAllInvoices = async () => {
    const [results] = await db.query(`
        SELECT I.*, C.CustomerName FROM Invoice I
        LEFT JOIN Customer C ON I.Customer_Id = C.Id`);
    return results;
};

exports.getInvoiceById = async (id) => {
    const [result] = await db.query("SELECT * FROM Invoice WHERE Id = ?", [id]);
    return result.length > 0 ? result[0] : null;
};

exports.updateInvoice = async (id, invoiceData) => {
    const {
        Invoice_number,
        Customer_Id,
        Invoice_Date,
        Due_Date,
        Total_Amount,
        Status,
    Tax,
    Discount,
    } = invoiceData;

    await db.query(
        `UPDATE Invoice SET 
         Invoice_number=?,
        Customer_Id=?,
        Invoice_Date=?,
        Due_Date=?,
        Total_Amount=?,
        Status=?,
    Tax=?,
    Discount=?
        WHERE Id = ?`,
        [
        Invoice_number,
        Customer_Id,
        Invoice_Date,
        Due_Date,
        Total_Amount,
        Status,
        Tax,
        Discount,
            id
        ]
    );
};

exports.deleteInvoice = async (id) => {
    await db.query("DELETE FROM Invoice WHERE Id = ?", [id]);
};
