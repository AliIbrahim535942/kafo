import { createContext, useContext, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setToast(null), 2800);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className={`toast-notification toast-${toast.type}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
