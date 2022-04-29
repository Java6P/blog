export interface Blog{
    aid: number,
    date: string,
    keyword: string,
    like_count: number,
    text: string,
    title: string,
    uid: number,
    summary: string,
}

export const BLOG_URL = "http://localhost:9999/"

export interface userComment{
    aid: string,
    comment: number,
    commentid: number,
    date: string,
    uid: string,
    username: string
}