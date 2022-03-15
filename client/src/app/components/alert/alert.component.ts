import { Component, Input, OnInit } from '@angular/core';

type AlertType = "success" | "error"

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message!: string;
  @Input() type!: AlertType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
