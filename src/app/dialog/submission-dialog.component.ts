import { Component, Inject,ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submission-dialog',
  template: `
    <div class="wrap-dialog"> 
        <h3 mat-dialog-title>Placeholders Detailes</h3>
        <div mat-dialog-content>
          <p [innerHTML]="highlightPlaceholders(data.openingSentence)"></p>
        </div>
        <div mat-dialog-actions>
        <button mat-raised-button (click)="onClose()">Close</button>
        </div>
    </div>
  `,
   styles: [`
    /* Add your styles directly here */
    
    .wrap-dialog{
        padding: 15px;
        font-family: "Rubik", sans-serif;
    }
    p{
      line-height: 2.2rem;
    }
    .highlight {
      background-color: #5A55F4;
      color: #fff;
      padding: 5px;
      border: 1px solid;
      border-radius: 10px;
    }
    .mat-dialog-content {
      padding: 16px;
    }
    .mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px 16px;
      border-top: 1px solid #ccc;
    }
    button{
        color:#fff;
        background-color:#000;
        border-radius:10px;
        border:none;
        padding:10px;
    }
    
  `],
  // encapsulation: ViewEncapsulation.None is added to the component metadata to ensure that styles are applied globally within the component. This ensures that the .highlight class is not scoped and is applied correctly to the dynamically inserted content.
  encapsulation: ViewEncapsulation.None // Disable view encapsulation

})
export class SubmissionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { openingSentence: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  highlightPlaceholders(text: string): string {
    return text.replace(/\[(.*?)\]/g, '<span class="highlight">[$1]</span>');
  }
}
