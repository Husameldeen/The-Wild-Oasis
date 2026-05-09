import { useEffect, useRef } from "react";

export function useCloseModel(handlerFunction, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handlerFunction();
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handlerFunction, listenCapturing],
  );
  return ref;
}
