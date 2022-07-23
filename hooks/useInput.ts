import { ChangeEvent, useCallback, useState } from "react";

export const useInput = <T extends HTMLInputElement | HTMLSelectElement>(
  initialValue: any
) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<T> | { target: { value: typeof initialValue } }) => {
      if (typeof initialValue === "string") {
        setValue(e.target.value);
        return;
      }
      if (typeof initialValue === "number") {
        const v = parseInt(e.target.value);
        setValue(v);
        return;
      }
    },
    [initialValue]
  );

  return { value, onChange };
};
