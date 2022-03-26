import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Board } from 'src/app/shared/models/board.model';

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
        this.selectedBoard = boards[0]
      },
      err => {
        throw err
      }
    );
  }
  boardChange() {
    console.dir(this.selectedBoard)
  }
  compareBoards(b1: Board, b2: Board) {
    return b1 && b2 && b1.id == b2.id;
  }

  public onBoardDataChanged(board: Board | null): void {
    if(!!board) {
      console.log(board);
      this.api.updateBoard(board.id, board).subscribe(
        res => {
        },
        err => {
          throw err
        }
      );;
    } 
  }

}
