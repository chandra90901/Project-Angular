// models/appSettingModel.js
const { db } = require("../db");

exports.createSetting = async (settingData) => {
  const { Property, Value } = settingData;

  const [result] = await db.query(
    `INSERT INTO AppSettings (Property, Value) VALUES (?, ?)`,
    [Property, Value]
  );

  return result.insertId;
};

exports.getAllSettings = async () => {
  const [results] = await db.query("SELECT * FROM AppSettings");
  return results;
};

exports.getSettingById = async (id) => {
  const [result] = await db.query("SELECT * FROM AppSettings WHERE Id = ?", [id]);
  return result.length > 0 ? result[0] : null;
};

exports.updateSetting = async (id, settingData) => {
  const { Property, Value } = settingData;

  await db.query(
    `UPDATE AppSettings SET Property = ?, Value = ? WHERE Id = ?`,
    [Property, Value, id]
  );
};

exports.deleteSetting = async (id) => {
  await db.query("DELETE FROM AppSettings WHERE Id = ?", [id]);
};


