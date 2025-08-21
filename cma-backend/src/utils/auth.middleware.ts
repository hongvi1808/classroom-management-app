import { errorResponse } from "./response";

export const handleError = (err: any, res: any) => {
     if (err.name === "UnauthorizedError") {
    if (err.inner?.name === "TokenExpiredError") {
      return errorResponse(res, {code: 'TOKEN_EXPIRED', message: 'Access token is expired'}, 401)
    }

    return errorResponse(res, err, 401)
  }

  return errorResponse(res, err, 500)
}
