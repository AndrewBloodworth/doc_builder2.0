import { RouteComponentProps } from "react-router-dom";
import { ParsableLine } from "../../builder/builder_types/types";
import MainClass from "../../builder/main";
import { UserRole, UserStatus } from "../../server/types";

export interface CustomRouteComponentProps extends RouteComponentProps {
  parentPath?: string;
  hasNav?: boolean;
  hasFooter?: boolean;
}

export interface MatchParams {
  any?: string;
  companyId?: string;
  accessToken?: string;
}

export type WithPrefix<T extends string> = `${T}${string}`;

export enum RoutePath {
  UNAUTHORIZED_WILDCARD = "*",
  HOME = "/",
  ACCOUNT = "/account",
  AUTH_WILDCARD = "/authenticate/*",
  AUTH_LOGIN = "/authenticate/login",
  INVITE_WILDCARD = "/invite/*",
  INVITE_REGISTER = "/invite/:accessToken",
  DASH_ADMIN = "/admin/dashboard",
  DASH_MAIN = "/dashboard",
  DASH_COMPANY = "/dashboard/company/:companyId",
  DASH_MEMBERS = "/dashboard/members",
}

/**
 * Redux State
 */

export interface AuthState {
  auth: AuthObject;
  redirectPath: undefined | string;
  id: null | number;
  validatingInvitation: boolean;
  validatingToken: boolean;
  validToken: boolean;
  resetPasswordSuccessful: boolean;
  requestedPasswordReset: boolean;
  validInvitation: null | boolean;
  loggedIn: boolean;
  preCheck: boolean;
  isLoading: boolean;
  hasError: boolean;
}

export interface ContractLinesObject {
  [index: string]: ParsableLine;
}

export interface ContractUtil {
  lines: ContractLinesObject;
  intputs: object;
  sections: object;
  inputs: Array<object>;
}
export interface FrontEndContractClass extends MainClass {
  util: ContractUtil;
  groupLength: number;
  signers: SignerObject[];
}
export interface CompanyState {
  contract: FrontEndContractClass;
  total: number;
  lineGroups: Array<ParsableLine[]>;
  lastPartIdx: number;
  currentPartIdx: number;
  signers: SignerObject[];
  refresh: object;
  isRefreshing: object;
  isLoading: boolean;
  hasError: boolean;
}

/**
 * State Objects
 */

export interface AuthObject {
  id?: number;
  role?: UserRole;
}

interface LineObject {
  thing: any;
}

interface SignerObject {
  thing: any;
}

/**
 * API Payloads
 */

export interface FetchContractPayload {
  contractId: number;
}

export interface FetchContractLinesPayload {
  contractId: number;
  offset: number;
  cb: {
    (data: any): void;
  };
}

export interface UpdateDeadlineTemplateBody {}
export interface UpdateDeadlineTemplatePayload {
  contractId: number;
  templateId: number;
  body: UpdateDeadlineTemplateBody;
  cb: {
    (): void;
  };
}

export interface SaveCurrentTemplateBody {}
export interface SaveCurrentTemplatePayload {
  contractId: number;
  body: SaveCurrentTemplateBody;
}

export interface FetchTemplatePayload {
  contractId: number;
  templateId: number;
}

export interface UpdateContractBody {}
export interface UpdateContractPayload {
  contractId: number;
  body: UpdateContractBody;
  cb: {
    (): void;
  };
}

export interface CreateSpacePropertyBody {}
export interface CreateSpacePropertyPayload {
  contractId: number;
  spaceId: number;
  body: CreateSpacePropertyBody;
}

export interface UpdateConfigBody {}
export interface UpdateConfigPayload {
  contractId: number;
  body: UpdateConfigBody;
}

export interface UpdateSignerFieldsBody {}
export interface UpdateSignerFieldsPayload {
  contractId: number;
  signerId: number;
  body: UpdateSignerFieldsBody;
}

export interface UpdateSignerStatusBody {}
export interface UpdateSignerStatusPayload {
  contractId: number;
  signerId: number;
  body: UpdateSignerStatusBody;
}

export interface AuthenticatePayload {
  email: string;
  password: string;
}
export interface ChangeEmailPayload {
  userId: number;
  email: string;
  password: number;
}

export interface ReceiveInvitationResponse {
  userId: number;
  firstName: string;
  lastName: string;
}

export interface ReceiveInvitationPayload {
  accessToken: string;
  cb: {
    (data: ReceiveInvitationResponse): void;
  };
}
export interface RegisterInvitationPayload {
  data: {
    firstName: string;
    lastName: string;
    password: string;
  };
  userId: number;
}

export interface ResetPasswordPayload {
  password: string;
  userId: number;
}

/**
 * Use State
 */
