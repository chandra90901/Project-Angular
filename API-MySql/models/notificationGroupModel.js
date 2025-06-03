const { db } = require("../db");

exports.createNotificationGroup = async (notificationGroupData) => {
  try {
    const { GroupName, Status } = notificationGroupData;

    const [result] = await db.query(
      `INSERT INTO NotificationGroup (GroupName, Status) VALUES (?, ?)`,
      [GroupName, Status]
    );

    return result.insertId;
  } catch (error) {
    console.error("Error creating notification group:", error);
    throw new Error("Database error while creating notification group");
  }
};

exports.getAllNotificationGroup = async () => {
  try {
    const [results] = await db.query("SELECT * FROM NotificationGroup");
    return results;
  } catch (error) {
    console.error("Error fetching notification groups:", error);
    throw new Error("Database error while fetching notification groups");
  }
};

exports.getNotificationGroupById = async (id) => {
  try {
    const [result] = await db.query("SELECT * FROM NotificationGroup WHERE Id = ?", [id]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(`Error fetching notification group with ID ${id}:`, error);
    throw new Error("Database error while fetching notification group by ID");
  }
};

exports.updateNotificationGroup = async (id, notificationGroupData) => {
  try {
    const { GroupName, Status } = notificationGroupData;

    const [result] = await db.query(
      `UPDATE NotificationGroup SET GroupName = ?, Status = ? WHERE Id = ?`,
      [GroupName, Status, id]
    );

    return result.affectedRows > 0; // Returns true if the update was successful
  } catch (error) {
    console.error(`Error updating notification group with ID ${id}:`, error);
    throw new Error("Database error while updating notification group");
  }
};

exports.deleteNotificationGroup = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM NotificationGroup WHERE Id = ?", [id]);
    return result.affectedRows > 0; // Returns true if deletion was successful
  } catch (error) {
    console.error(`Error deleting notification group with ID ${id}:`, error);
    throw new Error("Database error while deleting notification group");
  }
};
