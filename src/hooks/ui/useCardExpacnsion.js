import { useState, useRef, useEffect } from "react";

export function useCardExpansion(description) {
  const [expanded, setExpanded] = useState(false);
  const descRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  useEffect(() => {
    // Memeriksa apakah konten meluap (overflow) setelah render
    if (descRef.current) {
      setOverflowing(
        descRef.current.scrollHeight > descRef.current.clientHeight
      );
    }
  }, [description]);

  return { expanded, descRef, overflowing, toggleExpand };
}
