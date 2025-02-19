import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { Response } from 'express';
// import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.notesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
//     return this.notesService.update(+id, updateNoteDto);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }

  @Get(':id/download-pdf')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.notesService.generatePdfFile(+id);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="note-${id}.pdf"`,
    });
    
    res.send(buffer);
  }
}