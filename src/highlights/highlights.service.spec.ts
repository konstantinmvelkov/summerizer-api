import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsService } from './highlights.service';
import { getModelToken } from '@nestjs/mongoose';
import { Highlight } from './schemas/highlight.schema';
import { CreateHighlightDto } from './dto/create-highlight.dto';

describe('HighlightsService', () => {
  let service: HighlightsService;
  let model: any;

  beforeEach(async () => {
    model = {
      new: jest.fn().mockImplementation(() => ({})),
      save: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndRemove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HighlightsService,
        {
          provide: getModelToken(Highlight.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<HighlightsService>(HighlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a highlight', async () => {
      const createHighlightDto: CreateHighlightDto = {
        text: 'Some text to summarize.',
      };
      const summary = 'Summary of the text.';

      service['summarize'] = jest.fn().mockResolvedValue(summary);

      await service.create(createHighlightDto);

      expect(model.new).toHaveBeenCalledWith({
        text: createHighlightDto.text,
        summary,
      });
      expect(model.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all highlights', async () => {
      const result = [{ _id: 1, text: 'Text 1', summary: 'Summary 1' }];
      model.find.mockResolvedValue(result);

      const highlights = await service.findAll();

      expect(highlights).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a highlight by id', async () => {
      const result = { _id: 1, text: 'Text 1', summary: 'Summary 1' };
      model.findById.mockResolvedValue(result);

      const highlight = await service.findOne(1);

      expect(highlight).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a highlight by id', async () => {
      const id = 1;
      model.findByIdAndRemove.mockResolvedValue(true);

      const result = await service.remove(id);

      expect(result).toBeTruthy();
      expect(model.findByIdAndRemove).toHaveBeenCalledWith(id);
    });
  });
});
