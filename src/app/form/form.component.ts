import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { OpeningSentenceComponent } from '../opening-sentence/opening-sentence.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubmissionDialogComponent } from '../dialog/submission-dialog.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    OpeningSentenceComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: [''],
      phone: [''],
      openingSentence: ['Hi, this is [Agent Name] from [Company Name], do you have a few minutes to answer some questions?']
    });

  }

  onSubmit() {
    // alert(this.form.value.name);
    // alert(this.form.value.openingSentence);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { openingSentence: this.form.value.openingSentence };

    this.dialog.open(SubmissionDialogComponent, dialogConfig);

  }
}
