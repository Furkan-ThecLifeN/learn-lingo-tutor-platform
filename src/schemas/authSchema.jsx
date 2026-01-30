import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("İsim zorunludur"),
  email: yup.string().email("Geçerli bir email giriniz").required("Email zorunludur"),
  password: yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunludur"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Geçerli bir email giriniz").required("Email zorunludur"),
  password: yup.string().required("Şifre zorunludur"),
});

export const bookLessonSchema = yup.object().shape({
  fullName: yup.string().required("Ad Soyad zorunludur"),
  email: yup.string().email("Geçerli email").required("Email zorunludur"),
  phone: yup.string().required("Telefon numarası zorunludur"),
  reason: yup.string().required("Öğrenme nedeni seçilmelidir"),
});