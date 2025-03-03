import { useEffect, useState } from "react";

export const useDebouncedSearch = (delay = 1000) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);
  return { searchTerm, debouncedValue, setSearchTerm };
};
