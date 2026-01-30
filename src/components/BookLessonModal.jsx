import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookLessonSchema } from "../schemas/authSchema";
import { X } from "lucide-react";

const BookLessonModal = ({ isOpen, onClose, teacher }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(bookLessonSchema)
  });

  const onSubmit = (data) => {
    console.log("Rezervasyon Verileri:", data);
    alert("Ders talebiniz başarıyla alındı!");
    onClose();
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(18, 20, 23, 0.6)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999999, // Ekrandaki her şeyin üstü
      padding: '20px'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      width: '100%',
      maxWidth: '566px',
      maxHeight: '90vh',
      borderRadius: '30px',
      padding: '40px 60px',
      position: 'relative',
      overflowY: 'auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#121417'
    },
    teacherProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '12px',
      backgroundColor: '#f8f8f8',
      borderRadius: '15px',
      margin: '20px 0'
    },
    input: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid rgba(18, 20, 23, 0.1)',
      fontSize: '16px',
      outline: 'none',
      marginBottom: '4px'
    },
    submitBtn: {
      width: '100%', 
      marginTop: '20px',
      padding: '16px',
      backgroundColor: '#f4c550',
      color: '#121417',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '18px',
      cursor: 'pointer'
    },
    errorText: {
      color: '#ff4d4d',
      fontSize: '13px',
      marginBottom: '10px',
      fontWeight: '500'
    }
  };

  // createPortal kullanarak modalı doğrudan body'e ışınlıyoruz
  return ReactDOM.createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>
          <X size={32} />
        </button>

        <h2 style={{ fontSize: '40px', fontWeight: '700', letterSpacing: '-1.5px', margin: 0 }}>
          Book trial lesson
        </h2>
        
        <p style={{ color: '#8a8a89', fontSize: '16px', marginTop: '16px' }}>
          Our experienced tutor will assess your current level and create a personalized learning plan.
        </p>
        
        <div style={styles.teacherProfile}>
          <img src={teacher.avatar_url} alt={teacher.name} width="44" height="44" style={{ borderRadius: '50%' }} />
          <div>
            <p style={{ fontSize: '12px', color: '#8a8a89', margin: 0 }}>Your teacher:</p>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{teacher.name} {teacher.surname}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', margin: '24px 0 16px' }}>
            What is your main reason for learning English?
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {["Career and business", "Lesson for kids", "Living abroad", "Exams and coursework", "Culture, travel or hobby"].map((reason) => (
              <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" value={reason} {...register("reason")} style={{ width: '20px', height: '20px', accentColor: '#f4c550' }} />
                {reason}
              </label>
            ))}
            {errors.reason && <p style={styles.errorText}>{errors.reason.message}</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input {...register("fullName")} placeholder="Full Name" style={styles.input} />
            {errors.fullName && <p style={styles.errorText}>{errors.fullName.message}</p>}

            <input {...register("email")} placeholder="Email" style={styles.input} />
            {errors.email && <p style={styles.errorText}>{errors.email.message}</p>}

            <input {...register("phone")} placeholder="Phone number" style={styles.input} />
            {errors.phone && <p style={styles.errorText}>{errors.phone.message}</p>}
          </div>

          <button type="submit" style={styles.submitBtn}>Book</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default BookLessonModal;