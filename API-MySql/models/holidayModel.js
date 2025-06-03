const { db } = require("../db");

exports.createHoliday = async (HolidayData) => {
    const {
      
        HolidayName,
        Date,
        Status,

    } = HolidayData;

    const [result] = await db.query(
        `INSERT INTO \`Holiday\` ( HolidayName, Date, Status) 
         VALUES ( ?, ?, ?)`,
        [
            HolidayName,
            Date,
            Status
        ]
      );
    
      return result.insertId;
    };
    exports.getAllHolidays = async () => {
        const [results] = await db.query(` SELECT * FROM Holiday`);
        return results;
      };
      exports.getHolidayById = async (id) => {
        const [result] = await db.query("SELECT * FROM Holiday WHERE Id = ?", [id]);
        return result.length > 0 ? result[0] : null;
      };
      exports.updateHoliday = async (id, holidayData) => {
        const { 
          HolidayName,
          Date,
          Status,
          
        } = holidayData;

        const [result] = await db.query(
          `UPDATE \`Holiday\` 
          SET HolidayName = ?, 
              Date = ?, 
              Status = ? 
          WHERE Id = ?`,
            [
                HolidayName,
                Date,
                Status,
                id,
            ]
        );
    
      };
      exports.deleteHoliday = async (id) => {
        await db.query("DELETE FROM `Holiday` WHERE Id = ?", [id]);
        
      };

      

     
