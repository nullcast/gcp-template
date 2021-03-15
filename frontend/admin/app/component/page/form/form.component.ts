import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'frontend/lib/model/option.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  categoryOptions: IOption<string, string>[] = [
    { value: 'aaa', label: 'AAA' },
    { value: 'bbb', label: 'BBB' },
    { value: 'ccc', label: 'CCC' }
  ];
  genderOptins: IOption<string, string>[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.patchValue();
  }

  emit() {
    this.changeDetectorRef.detectChanges();
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      body: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
  }

  patchValue() {
    setTimeout(() => {
      this.formGroup.patchValue({
        category: 'aaa',
        name: 'Hayato Wada',
        address: 'hatoyab@gmail.com',
        body: `aaaaaa\nbbbbbbbbb\ncccccccccccccccc`,
        gender: 'female'
      });
      this.emit();
    });
  }
}
