import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/shared/models/card.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddStoryModalComponent } from '../add-story-modal/add-story-modal.component';
import { Column } from 'src/app/shared/models/column.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Output()
  public boardChanged = new EventEmitter<Board | null>();
  @Output()
  public cardDeleted = new EventEmitter<Card>();
  @Input() board!: Board | null;
  bodyElement: HTMLElement = document.body;
  @ViewChild('menuTrigger') cardMenu!: MatMenuTrigger;
  

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
    this.boardChanged.emit(this.board);
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
          this.boardChanged.emit(this.board);
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
          this.boardChanged.emit(this.board);
        }
    );
  }
  deleteCard(column: Column, card: Card) {
    column.deleteCard(card);
    this.cardDeleted.emit(card);
  }
}