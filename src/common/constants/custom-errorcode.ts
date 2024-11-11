export const customErrorCodes = {
  UNAUTHORIZED_HEADER: 3001,
  REQUES_EXCEEDED: 3002,
  INVALID_JSON: 3003,
} as const;

export type CustomErrorCodes =
  (typeof customErrorCodes)[keyof typeof customErrorCodes];
