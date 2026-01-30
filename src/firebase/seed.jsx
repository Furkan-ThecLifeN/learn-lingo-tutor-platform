import { ref, set } from "firebase/database";
import { db } from "./config";
import teachersData from "../teachers.json";

export const uploadTeachers = async () => {
  try {
    await set(ref(db, 'teachers'), teachersData);
    console.log("Veriler başarıyla yüklendi!");
  } catch (error) {
    console.error("Hata:", error);
  }
};