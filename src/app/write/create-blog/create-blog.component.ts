import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BlogService } from '../../blog/blog.service';

declare const editormd: any;
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.less']
})
export class CreateBlogComponent implements OnInit, AfterViewInit {
  isVisible = false;
  isOkLoading = false;
  editor: any;
  keyword: string = '';
  blog: any = {
    aid: 0,
    date: '',
    keyword: '',
    like_count: 0,
    text: "# 开始你的创作"+"\n"+
          "# 一级标题\n" +
          "## 二级标题\n" +
          "### 三级标题\n" +
          "#### 四级标题\n" +
          "##### 五级标题\n" +
          "###### 六级标题\n" +
          "------------\n" +
          "- 项目\n" +
          "  * 项目\n" +
          "    + 项目\n" +
          "\n" +
          "1. 项目1\n" +
          "2. 项目2\n" +
          "3. 项目3\n" +
          "------------\n" +
          "下面展示一些 `内联代码片`。\n" +
          "```\n" +
          "// A code block\n" +
          "var foo = 'bar';\n" +
          "```\n" +
          "```javascript\n" +
          "// An highlighted block\n" +
          "var foo = 'bar';\n```",
    title: '',
    summary: '',
    uid: 0,
  };
  constructor(
    private blogService: BlogService,
  ) { }

  showModal(): void {
    this.isVisible = true;
    this.blog.text = this.editor.getMarkdown();
    // console.log(this.blog)
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  ngOnInit(): void { 
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

  return(): void{
    window.history.go(-1);
  }
  // title: string, text: string, keyword: string
  addBlog(): void{
    this.isOkLoading = true;
    this.blog.uid = localStorage.getItem("uid");
    this.blog.date = new Date();
    this.blogService.addBlog(this.blog)
    .subscribe(blog => {
      this.isVisible = false;
      this.isOkLoading = false;
      if (blog.uid == this.blog.uid){
        window.location.href = `/write/success/${blog.title}`;
      }
    });
  }
}
