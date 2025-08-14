export const successResponse = (res: any, data: any) => {
    return res.status(200).json({
        success: true,
        data: data,
    });
}

export const errorResponse = (res: any, error: any, status: number = 500) => {
    return res.status(status).json({
        success: false,
        error,
    });
}