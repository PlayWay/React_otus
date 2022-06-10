import React, { useCallback, useEffect, useRef, useState } from "react";
import Cards from "./Cards";

export interface CardsContainerProps {
  value: number;
}

export const CardsContainer: React.FC<CardsContainerProps> = ({ value }) => {
  const [active, setActive] = useState<string[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(40);

  const onChooseCard = useCallback(
    (key: string) => {
      if (active.includes(key)) {
        return;
      }
      setActive((prev) => [...prev, key]);
    },
    [active]
  );

  useEffect(() => {
    setSize(
      elementRef.current?.clientWidth
        ? elementRef.current?.clientWidth / value / 3
        : 40
    );
  }, [value]);

  return (
    <Cards
      active={active}
      value={value}
      onChooseCard={onChooseCard}
      elementRef={elementRef}
      size={size}
    />
  );
};

export default CardsContainer;
