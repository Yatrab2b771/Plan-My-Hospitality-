import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

export function showToast(message, type = "success") {
  const event = new CustomEvent("show-toast", { detail: { message, type } });
  window.dispatchEvent(event);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const { message, type } = e.detail;
      const id = Date.now() + Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 shadow-soft text-sm font-bold text-white ${
              toast.type === "error" ? "bg-sky-700" : "bg-sky-600"
            }`}
          >
            {toast.type === "error" ? <FaCircleExclamation className="text-lg shrink-0" /> : <FaCircleCheck className="text-lg shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
