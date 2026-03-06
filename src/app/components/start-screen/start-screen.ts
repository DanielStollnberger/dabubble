import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-start-screen',
  imports: [RouterLink,
    MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
  ],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen {

}
