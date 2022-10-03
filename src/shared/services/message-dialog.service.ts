import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';
import { MessageDialogData } from '../interfaces/messageDialog';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: MessageDialogData): Observable<boolean> {
    return this.dialog
      .open(MessageDialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }

  errorMessageDialog() {
    const data = {
      title: 'Error Message',
        message: "The operation couldn't be completed",
        confirmCaption: 'Confirm',
        showCancelOption: false
    }
    return this.dialog
      .open(MessageDialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}
