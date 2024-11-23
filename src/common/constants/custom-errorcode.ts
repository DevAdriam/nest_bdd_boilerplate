export const customErrorCodes = {
  UNAUTHORIZED_HEADER: 3001,
  REQUEST_EXCEEDED: 3002,
  INVALID_JSON: 3004,
  INVALID_USER: 3005,
} as const;

export type CustomErrorCodes =
  (typeof customErrorCodes)[keyof typeof customErrorCodes];
