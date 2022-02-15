import { AppConstant } from "const";

export const getAbsolutePath = (path) => AppConstant.LANDING_URL + (path || "");
