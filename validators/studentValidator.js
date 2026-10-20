const { z } = require("zod");

const studentSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform(
    (value) => value.toLowerCase()
  ),
  course: z.string().trim().min(1).max(100),
  age: z.number().int().min(1).max(120),
}).strict();

const updateStudentSchema = studentSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided" }
);

module.exports = { studentSchema, updateStudentSchema };