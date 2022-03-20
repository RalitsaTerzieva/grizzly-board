import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-add-story-modal',
  templateUrl: './add-story-modal.component.html',
  styleUrls: ['./add-story-modal.component.css']
})
export class AddStoryModalComponent implements OnInit {
  card: Card = new Card()
  form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddStoryModalComponent>,
        @Inject(MAT_DIALOG_DATA) card:Card ) {
          this.card = card;
          let {title, description, comment} = card;

        this.form = this.fb.group({
            title: [title, Validators.required],
            description: [description, Validators.required],
            comment: [comment],
        });

    }

    ngOnInit() {}

    save() {
        if(this.form.valid) {
          Object.assign(this.card, this.form.value)
          this.dialogRef.close(this.card);
        }
    }

    close() {
        this.dialogRef.close();
    }

}
