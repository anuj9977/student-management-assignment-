
const mongoose = require("mongoose");
const Student = require("../models/Student");
const {
  studentSchema,
  updateStudentSchema,
} = require("../validators/studentValidator");

// Create Student
const createStudent = async (req, res, next) => {
  try {
    const result = studentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const student = await Student.create(result.data);

    res.status(201).json({
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Students
const getStudents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        message: "Invalid page or limit",
      });
    }

    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ data: students });
  } catch (error) {
    next(error);
  }
};

// Get Student by ID
const getStudentById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    next(error);
  }
};

// Update Student
const updateStudent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const result = updateStudentSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      result.data,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Student
const deleteStudent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
