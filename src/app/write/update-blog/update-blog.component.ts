import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../blog/blog';
import { BlogService } from '../../blog/blog.service';

declare const editormd: any;
@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.less']
})
export class UpdateBlogComponent implements OnInit, AfterViewInit {
  editor: any;
  isOkLoading = false;
  isVisible = false;

  public blog: any = {
    aid: 0,
    date: '',
    keyword: '',
    like_count: 0,
    text: "",
    title: '',
    uid: 0,
    summary: '',
  };
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
    ) { }

  ngOnInit(): void { 
    this.getBlog();
  }
  ngAfterViewInit() {
    this.initMarkdown();
  }

  initMarkdown() {
    this.editor = editormd('container', {
      width: '100%',
      height: '92vh',
      path: '../../../../assets/md_editor/lib/',
    });
  }

  getBlog(): void {
    const aid = Number(this.route.snapshot.paramMap.get('aid'));
    this.blogService.getBlog({aid} as unknown as Blog)
      .subscribe(blog => {
        this.blog = blog[0];
        this.loading = false;
      });
  }
  
  return(): void{
    window.location.href = "/blog/home";
  }

  showModal(): void {
    this.isVisible = true;
    this.blog.text = this.editor.getMarkdown();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  updateBlog(): void{
    this.isOkLoading = true;
    this.blog.uid = localStorage.getItem("uid");
    this.blogService.updateBlog(this.blog)
    .subscribe(_ => {
      this.isVisible = false;
      this.isOkLoading = false;
    });
  }
}
