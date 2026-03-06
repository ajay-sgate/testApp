import * as types from "../../actionType";

export const changeTheme = (data:any) => {
  return { type: types.THEME,data };
};
