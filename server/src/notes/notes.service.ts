import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';
// import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    const savedNote = await this.notesRepository.save(note);
    return savedNote;
  }

  async findAll(): Promise<Note[]> {
    return await this.notesRepository.find();
  }

//   async findOne(id: number): Promise<Note | null> {
//     return await this.notesRepository.findOne({ where: { id } });
//   }

//   async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
//     await this.notesRepository.update(id, updateNoteDto);
//     return this.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}