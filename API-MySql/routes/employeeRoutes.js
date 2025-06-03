const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: Employee management
 */
/**
 * @swagger
 * /api/employee:
 *   post:
 *     tags: [Employee]
 *     summary: Create a new employee record
 *     description: Creates a new employee record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeName:
 *                 type: string
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *               EmployeeStatusId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /api/employee:
 *   get:
 *     tags: [Employee]
 *     summary: Get all employee records
 *     description: Retrieves a list of all employee records.
 *     responses:
 *       200:
 *         description: A list of all employee records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   employeeName:
 *                     type: string
 *                   DateOfBirth:
 *                     type: string
 *                     format: date
 *                   EmployeeStatusId:
 *                     type: integer
 *       500:
 *         description: Server error
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     tags: [Employee]
 *     summary: Get an employee record by ID
 *     description: Retrieve a specific employee record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee record
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested employee record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employeeName:
 *                   type: string
 *                 DateOfBirth:
 *                   type: string
 *                   format: date
 *                 EmployeeStatusId:
 *                   type: integer
 *       404:
 *         description: Employee record not found
 *       500:
 *         description: Server error
 */
router.get("/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     tags: [Employee]
 *     summary: Update an employee record
 *     description: Modify an existing employee record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee record to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [present, absent, leave]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Employee record updated
 *       404:
 *         description: Employee record not found
 *       500:
 *         description: Server error
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     tags: [Employee]
 *     summary: Delete an employee record
 *     description: Delete a specific employee record using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee record deleted successfully
 *       404:
 *         description: Employee record not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;