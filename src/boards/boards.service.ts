import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
// import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    //Inject Repository to Service
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}
    // getAllBoards(): Board[] {
    //     console.log('getAllBoards:', this.boards);
    //     return this.boards;
    // }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title: title,
    //         description: description,
    //         status: BoardStatus.PUBLIC,
    //     };
    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // getBoardById(id: string): Board {
    //     console.log(
    //         'getBoardById: ',
    //         this.boards.find((board) => board.id === id),
    //     );
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
