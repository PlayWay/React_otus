import { RootState } from "../../store";

export const userNameSelector = (state: RootState) => state.auth.user.name;
