// models/moduleModel.js
const { db } = require("../db");

exports.createModule = async (moduleData) => {
    const {
        Name,
        Active,

    } = moduleData;
    const [result] = await db.query(
        `INSERT INTO Module (Name, Active) VALUES (?, ?)`,
        [
            Name,
            Active,

        ]
    );
    return result.insertId;
};

exports.getAllModules = async () => {
    const [results] = await db.query("SELECT * FROM Module");
    return results;
};

exports.getModuleById = async (id) => {
    const [result] = await db.query("SELECT * FROM Module WHERE Id = ?", [id]);
    return result.length > 0 ? result[0] : null;
};

exports.updateModule = async (id, moduleData) => {
    const {
        Name,
        Active
    } = moduleData;
    const activeValue = Active ? 1 : 0;
    try {
        const [result] = await db.execute(
            `UPDATE Module SET Name = ?, Active = ? WHERE Id = ?`,
            [Name, activeValue, id]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Module with ID ${id} not found.`);
        }
        return result;
    } catch (error) {
        throw error;
    }
};

exports.deleteModule = async (id) => {
    await db.query("DELETE FROM Module WHERE Id = ?", [id]);
};
