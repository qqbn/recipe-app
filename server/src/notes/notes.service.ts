import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos/create-note.dto';
// import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    note.title = `Note Pending`;
    const savedNote = await this.notesRepository.save(note);
    savedNote.title = `Note ${savedNote.id}`;
    await this.notesRepository.update(savedNote.id, { title: savedNote.title });
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

  async generatePdfFile(id: number): Promise<Buffer> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
  
    return new Promise((resolve) => {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];
  
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
  
      doc.fontSize(20).text(note.title, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(note.content);
      
      doc.end();
    });
  }
}