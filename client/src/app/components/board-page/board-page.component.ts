import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Board } from 'src/app/shared/models/board.model';
import { Card } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {
  boards!: Board[];
  selectedBoard: Board | null = null;
  constructor(private api: AuthService) {
  }

  ngOnInit(): void {
    this.api.boards().subscribe(
      boards => {
        this.boards = boards.map((board: Board) => new Board().deserialize(board))
        this.selectedBoard = this.boards[0]
      },
      err => {
        throw err
      }
    );
  }
  boardChange() {
  }
  compareBoards(b1: Board, b2: Board) {
    return b1 && b2 && b1.id == b2.id;
  }

  public onBoardDataChanged(board: Board | null): void {
    if(!!board) {
      this.api.updateBoard(board.id, board).subscribe(
        res => {
          if (!!res.board) {
            this.selectedBoard?.deserialize(res.board)
          }
        },
        err => {
          throw err
        }
      );;
    } 
  }

  public onCardDeleted(card: Card): void {
      this.api.deleteCard(card.id).subscribe(
        res => {
        },
        err => {
          throw err
        }
      );
    }
}
