import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean = false;
  user: string = "";
  title = 'GrizzlyBear';
  constructor(private tokenStorage: TokenStorageService) {
    this.loggedIn = !!tokenStorage.getToken()
    let user = this.tokenStorage.getUser();
    this.user = `${user['first_name']} ${user['last_name']}`;
  }
  logout(): void {
    this.loggedIn = false;
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
