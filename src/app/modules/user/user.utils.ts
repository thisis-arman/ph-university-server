import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.modal";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();

  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;

  let currentId = "0000";

  if (lastStudentId) {
    const lastStudentYear = Number(lastStudentId.substring(0, 4));
    const lastStudentCode = lastStudentId.substring(4, 6);
    const lastStudentNumber = lastStudentId.substring(6);

    if (
      lastStudentYear === currentSemesterYear &&
      lastStudentCode === currentSemesterCode
    ) {
      currentId = (Number(lastStudentNumber) + 1).toString().padStart(4, "0");
    } else {
      currentId = "0001";
    }
  } else {
    currentId = "0001";
  }

  const newStudentId = `${currentSemesterYear}${currentSemesterCode}${currentId}`;

  return newStudentId;
};


const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  console.log("Last Faculty ID: ", lastFaculty?.id);
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  let currentId = "0"; // Initialize currentId as a string "0"
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2); // Extract numeric part of the last ID (after "F-")
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0"); // Increment and pad the ID

  incrementId = `F-${incrementId}`; // Prepend "F-"

  console.log("Generated Faculty ID: ", incrementId);
  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};