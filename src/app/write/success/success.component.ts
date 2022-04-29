import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.less']
})
export class SuccessComponent implements OnInit {
  title: string = "";
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getBlog();
  }
  getBlog(): void {
    this.title = String(this.route.snapshot.paramMap.get('aid'));
  }
}
