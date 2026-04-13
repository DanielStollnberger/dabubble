import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-server-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './server-dialog.html',
  styleUrl: './server-dialog.scss',
})
export class ServerDialog {

}
