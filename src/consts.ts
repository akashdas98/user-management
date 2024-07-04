export const ERROR = {
  USER_NOT_FOUND: {
    message: 'User not found',
    status: 404,
  },
  USER_ALREADY_EXISTS: {
    message: 'User already exists.',
    status: 409,
  },
  USERNAME_ALREADY_EXISTS: {
    message: 'Username already exists.',
    status: 409,
  },
  BLOCKER_BLOCKED_EQUAL: {
    message: 'Blocker cannot be same as blocked.',
    status: 400,
  },
  RECORD_ALREADY_EXISTS: {
    message: 'Record already exists.',
    status: 409,
  },
  RECORD_NOT_FOUND: {
    message: 'Record not found.',
    status: 404,
  },
  INVALID_BIRTH_DATE_DETAILS: {
    message: 'Invalid birth year/month/date.',
    status: 400,
  },
};
