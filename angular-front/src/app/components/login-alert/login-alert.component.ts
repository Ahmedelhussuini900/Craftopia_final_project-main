    import { Component, Inject } from '@angular/core';
    import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
    import { MatIconModule } from '@angular/material/icon';
    import { MatButtonModule } from '@angular/material/button';
    import {
      MatDialogModule,
      MAT_DIALOG_DEFAULT_OPTIONS
    } from '@angular/material/dialog';
    import { CommonModule } from '@angular/common';


    @Component({
      selector: 'app-login-alert',
      standalone: true,
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
      ],
      templateUrl: './login-alert.component.html'
    })
    export class LoginAlertComponent {
      message: string = 'An unspecified error has occurred';
      icon: string = '';
      buttonText = 'Ok';

      constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: {
          message: string;
          icon: string;
          buttonText: string;
        },
        private dialogRef: MatDialogRef<LoginAlertComponent>
      ) {
        if (data?.icon) this.icon = data.icon;
        if (data?.message) this.message = data.message;
        if (data?.buttonText) this.buttonText = data.buttonText;
      }

      closeDialog() {
        this.dialogRef.close();
      }
    }