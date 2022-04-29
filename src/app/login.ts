export interface Cookie {
    msg: string, 
    code: number, 
    data: {
        token: '',
        user: User,
    },
}

export interface loginform {
    account: string,
    password: string,
}

export interface User {
    userid: string,
    account: string,
    answer: string,
    entranceDate: string,
    fansnumber: string,
    gender: string,
    introduce: string,
    name: string,
    password: string,
    question: string,
}

export const ROOT_URL = "http://localhost:9999/"