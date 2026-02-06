import { Response } from 'express';

export function success(res: Response, data: any, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function error(res: Response, message = 'Error', statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

export function paginated(
  res: Response,
  data: any[],
  total: number,
  page: number,
  limit: number,
  message = 'Success'
) {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
