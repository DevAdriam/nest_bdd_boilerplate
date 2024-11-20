export const customErrorCodes = {
  UNAUTHORIZED_HEADER: 3001,
  REQUES_EXCEEDED: 3002,
  INVALID_JSON: 3004,
} as const;

export type CustomErrorCodes =
  (typeof customErrorCodes)[keyof typeof customErrorCodes];
