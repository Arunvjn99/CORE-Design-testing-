import { useEffect, useRef, useState } from "react";

// created for coredrop component .(Detects whether it is top element)
export function useIsVisible(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

//custom hook to merge mult refs
export function useMergerRefs(...refs) {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
