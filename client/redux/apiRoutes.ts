import { API_ROUTE } from "../../server/types";

import formatAPIRoute from "../utils/formatAPIRoute";

export const authAPI = formatAPIRoute(API_ROUTE.AUTH);
export const companyAPI = formatAPIRoute(API_ROUTE.COMPANY);
export const invitationAPI = formatAPIRoute(API_ROUTE.INVITATION);
