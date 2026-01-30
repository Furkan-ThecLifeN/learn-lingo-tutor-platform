import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schemas/authSchema";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import Modal from "./Modal";

const RegisterModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      onClose();
    } catch (error) {
      alert("Kayıt hatası: " + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registration">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <p className="error">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" />
        <p className="error">{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" />
        <p className="error">{errors.password?.message}</p>

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </Modal>
  );
};

export default RegisterModal;