import { useEffect, useState } from "react";

import { useProject } from "@/hooks/useProject";

export const Error: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { resetError } = useProject();

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      resetError();
    }, 4000);

    return () => clearTimeout(timer);
  }, [resetError]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm font-semibold px-4 py-3 rounded shadow-lg z-50 w-[300px] text-center">
      <span>Sorry, something went wrong.</span>
    </div>
  );
};
