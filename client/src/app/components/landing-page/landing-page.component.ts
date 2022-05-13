import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

interface AppStats {
  userCount: number;
  boardCount: number;
  cardCount: number;
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  stats!: AppStats;
  constructor(private api: AuthService) {
    this.api.stats().subscribe(
      data => {
        this.stats = data
      },
      err => {
        throw err
      }
    );
  }

  ngOnInit(): void {
  }

}
