// components/CustomNotification.tsx
import { motion, AnimatePresence } from "framer-motion";

export function CustomNotification({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-white text-black border border-gray-300 rounded-xl px-4 py-3 shadow-xl z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
