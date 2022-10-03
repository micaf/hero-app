import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MaterialModule } from './material.module';

//Components
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { LoadingSpinnerComponent } from 'src/shared/components/loading-spinner/loading-spinner.component';

//Directive
import { UpperCaseInputDirective } from './directives/upper-case-input.directive';

//Service
import { MessageDialogService } from './services/message-dialog.service';




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
