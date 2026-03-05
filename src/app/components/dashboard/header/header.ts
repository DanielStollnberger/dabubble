import { Component } from '@angular/core';
import { UserProfile } from '../../user-profile/user-profile';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    UserProfile,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
