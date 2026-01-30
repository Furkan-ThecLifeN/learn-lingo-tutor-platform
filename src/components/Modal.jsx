import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Inline Styles - Diğer hiçbir CSS dosyasından etkilenmez
  const styles = {
    backdrop: {
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
      zIndex: 99999, // Her şeyin üstünde
      padding: '20px'
    },
    content: {
      backgroundColor: '#ffffff',
      width: '100%',
      maxWidth: '566px',
      maxHeight: '90vh',
      borderRadius: '30px',
      padding: '64px',
      position: 'relative',
      overflowY: 'auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      animation: 'modalFadeIn 0.3s ease-out'
    },
    header: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    title: {
      fontSize: '40px',
      fontWeight: '700',
      lineHeight: '1.2',
      margin: 0,
      color: '#121417',
      letterSpacing: '-1.5px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#8a8a89',
      marginTop: '16px',
      lineHeight: '1.5'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#121417',
      padding: '5px',
      display: 'flex',
      transition: 'transform 0.2s ease'
    },
    body: {
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      {/* Animasyon için style tag'i ekliyoruz */}
      <style>
        {`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
      
      <div 
        style={styles.content} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.subtitle}>
              Please enter your details to proceed with our language services.
            </p>
          </div>
          <button 
            style={styles.closeBtn} 
            onClick={onClose}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            <X size={32} />
          </button>
        </div>
        
        <div style={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;