import { useToast } from "../../context/ToastContext";

function ToastContainer() {
  const { toast } = useToast();

  if (!toast) {
    return null;
  }

  return null;
}

export default ToastContainer;
