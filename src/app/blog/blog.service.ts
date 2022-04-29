import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../login';
import { Blog, BLOG_URL, userComment } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = BLOG_URL + "article/";
  private commentUrl = BLOG_URL + "comment/";
  private userUrl = BLOG_URL + "user/";
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);  // log to console instead
      if (error.status == 403) {
        window.location.href = "/nopermission";
      }
      else if(error.state == 500){
        this.nzMessageService.error("服务器错误，请稍后再试！");
      }
      else {
        // TODO: better job of transforming error for blog consumption
        this.nzMessageService.error(`${operation}错误`);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor( 
    private http: HttpClient,
    private nzMessageService: NzMessageService
    ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 
    }),
  };

  httpOptionsToken = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*','token' : `${localStorage.getItem('Token')}` })
  };
// 'Token': `${localStorage.getItem('Token')}`,
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.blogUrl}list`, this.httpOptions)
      .pipe(
        tap(_ => null),
        catchError(this.handleError<Blog[]>('获取博客', []))
      )
  }
  //查找blog
  getBlog(blog: any): Observable<Blog[]> {
    return this.http.post<Blog[]>(`${this.blogUrl}find`, blog, this.httpOptions)
    .pipe(
      tap(_ => null),
      catchError(this.handleError<Blog[]>('查询博客'))
    );
  }
  //根据关键词查找blog
  findByTextBlog(blog: string): Observable<Blog[]> {
    return this.http.post<Blog[]>(`${this.blogUrl}find/text`, blog, this.httpOptions)
    .pipe(
      tap(_ => null),
      catchError(this.handleError<Blog[]>('查询博客'))
    );
  }
  // 删除博客
  deleteBlog(aid: number): Observable<Blog> {
    return this.http.delete<Blog>(`${this.blogUrl}delete?aid=${aid}`,this.httpOptionsToken)
    .pipe(
      tap(_ => this.nzMessageService.success('已删除！')),
      catchError(this.handleError<Blog>("删除博客"))
    );
  }
  // 发布博客
  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.blogUrl}save`, blog, this.httpOptionsToken).pipe(
      tap((newBlog: Blog) => this.nzMessageService.success(`发布成功，发布的博客标题为${newBlog.title}`)),
      catchError(this.handleError<Blog>('发布博客'))
    );
  }
  // 更新博客
  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.blogUrl}update`, blog, this.httpOptionsToken).pipe(
      tap(_ => {
        this.nzMessageService.success(`更新成功！`);
        window.location.href = `/write/success/${blog.title}`;
      }),
      catchError(this.handleError<Blog>('更新博客'))
    );
  }
  // 点赞博客
  updateLikeBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.blogUrl}update`, blog, this.httpOptionsToken).pipe(
      tap(_ => this.nzMessageService.success(`点赞成功，感谢！`)),
      catchError(this.handleError<Blog>('点赞'))
    );
  }
  //查找comment
  findUserComment(comment: any): Observable<userComment[]> {
    return this.http.post<userComment[]>(`${this.commentUrl}find`, comment, this.httpOptions)
    .pipe(
      tap(_ => null),
      catchError(this.handleError<userComment[]>('获取评论'))
    );
  }
  // 新增评论
  addUserComment(comment: userComment): Observable<userComment> {
    return this.http.post<userComment>(`${this.commentUrl}save`, comment, this.httpOptionsToken).pipe(
      tap(_ => this.nzMessageService.success(`发布评论成功！`)),
      catchError(this.handleError<userComment>('发布评论'))
    );
  }
  // 删除评论
  deleteuserComment(commentid: number): Observable<userComment> {
    return this.http.delete<userComment>(`${this.commentUrl}delete?commentid=${commentid}`,this.httpOptionsToken)
    .pipe(
      tap(_ => this.nzMessageService.success('已删除！')),
      catchError(this.handleError<userComment>("删除评论"))
    );
  }
  //查找user
  getUser(user: any): Observable<User[]> {
    return this.http.post<User[]>(`${this.userUrl}find`, user, this.httpOptions)
    .pipe();
  }
}