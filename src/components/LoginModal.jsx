import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/authSchema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import Modal from "./Modal";

const LoginModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (error) {
      alert("Hatalı giriş: " + error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log In">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" />
        <p className="error">{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" />
        <p className="error">{errors.password?.message}</p>

        <button type="submit" className="submit-btn">Log In</button>
      </form>
    </Modal>
  );
};

export default LoginModal;