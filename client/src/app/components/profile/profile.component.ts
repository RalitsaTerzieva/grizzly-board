import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private tokenStorage: TokenStorageService) {
      this.user = this.tokenStorage.getUser();
  }

  ngOnInit(): void {
  }

}
