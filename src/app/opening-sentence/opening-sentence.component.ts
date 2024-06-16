import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-opening-sentence',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatInputModule,
    FlexLayoutModule
  ],
  templateUrl: './opening-sentence.component.html',
  styleUrl: './opening-sentence.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeningSentenceComponent),
      multi: true,
      
    }
  ]

})
export class OpeningSentenceComponent implements ControlValueAccessor, OnInit {
  @Input() placeholders: string[] = [];
  text: string = '';
  @ViewChild('textarea') textarea!: ElementRef;

  public onChange = (value: string) => {};
  public onTouched = () => {};

  ngOnInit() {}

  writeValue(value: string): void {
    if (value) {
      this.text = value;
      this.extractPlaceholders(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state
  }

  addPlaceholder(placeholder: string) {
    const placeholderText = `[${placeholder}]`;
    const textareaEl = this.textarea.nativeElement; // Access the textarea element
    const startPos = textareaEl.selectionStart; // Get the cursor start position
    const endPos = textareaEl.selectionEnd; // Get the cursor end position
    this.text = this.text.slice(0, startPos) + placeholderText + this.text.slice(endPos); // Insert text at cursor position
    this.onChange(this.text); // Trigger change detection
    setTimeout(() => {
      textareaEl.selectionStart = textareaEl.selectionEnd = startPos + placeholderText.length; // Set cursor position
      textareaEl.focus(); // Focus the textarea
    }, 0);
  }

  private extractPlaceholders(value: string) {
    const regex = /\[(.*?)\]/g;
    let match;
    while ((match = regex.exec(value)) !== null) {
      if (!this.placeholders.includes(match[1])) {
        this.placeholders.push(match[1]);
      }
    }
  }
}