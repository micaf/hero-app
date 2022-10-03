import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { UpperCaseInputDirective } from './directives/upper-case-input.directive';
import { MessageDialogService } from './services/message-dialog.service';
import { LoadingSpinnerComponent } from 'src/shared/components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    UpperCaseInputDirective,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    MessageDialogService
  ],
  exports: [
    LoadingSpinnerComponent,
    UpperCaseInputDirective,
    MessageDialogComponent
  ]
})
export class SharedModule { }
