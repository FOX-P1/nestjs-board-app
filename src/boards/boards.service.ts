import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardStatus } from './board.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        console.log('getAllBoards:', this.boards);
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;

        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        console.log(
            'getBoardById: ',
            this.boards.find((board) => board.id === id),
        );
        const found = this.boards.find((board) => board.id === id);
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}