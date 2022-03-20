import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/shared/models/card.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddStoryModalComponent } from '../add-story-modal/add-story-modal.component';
import { Column } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board!: Board | null;
  bodyElement: HTMLElement = document.body;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  dragStart(event: CdkDragStart) {
    this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'grabbing';
  }

  drop(event: CdkDragDrop<Card[]>) {
    this.bodyElement.classList.remove('inheritCursors');
    this.bodyElement.style.cursor = 'unset';

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.item.data.index = event.currentIndex;
  }

  addCard(column: Column) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40vw";
    dialogConfig.data = {};

    const dialogRef = this.dialog.open(AddStoryModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        card => {
          if (!card) { return }
          console.log("Dialog output:", card)
          column.cards.push(card)
          column.cards = column.cards.map((card, index) => {
            card.index = index;
            return card;
          })
        }
    );
  }

  editCard(card: Card) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40vw";
    dialogConfig.data = card;

    const dialogRef = this.dialog.open(AddStoryModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        card => {
          console.log(card)
        }
    );
  }
}
