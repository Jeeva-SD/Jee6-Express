export interface ApiResult {
    status?: string,
    code?: number,
    message?: string,
    data: any
}

const createResult = (code: number, data: any) => {
    const result = {
        code,
        data: data ? data : null
    }

    return result;
}

export const dataFound = (data: any) => {
    return createResult(1000, data);
}

export const dataNotFound = (data: any = []) => {
    return createResult(1001, data);
}