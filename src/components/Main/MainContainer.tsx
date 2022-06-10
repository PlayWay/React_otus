import React, { createContext, useState } from "react";
import Main from "./Main";

export const SetSizeContext = createContext<(i: number) => void>(() => ({}));
export const MainContainer: React.FC = ({}) => {
  const [size, setSize] = useState<number>(3);

  return (
    <SetSizeContext.Provider value={setSize}>
      <Main value={size} />
    </SetSizeContext.Provider>
  );
};

export default MainContainer;
