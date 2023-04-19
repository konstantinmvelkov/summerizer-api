import { Test, TestingModule } from '@nestjs/testing';
import { HighlightsController } from './highlights.controller';
import { HighlightsService } from './highlights.service';

class MockHighlightsService {
  create = jest.fn();
  findAll = jest.fn();
}

describe('HighlightsController', () => {
  let highlightsController: HighlightsController;
  let highlightsService: MockHighlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighlightsController],
      providers: [
        {
          provide: HighlightsService,
          useClass: MockHighlightsService,
        },
      ],
    }).compile();

    highlightsController =
      module.get<HighlightsController>(HighlightsController);
    highlightsService = module.get<HighlightsService>(
      HighlightsService,
    ) as unknown as MockHighlightsService;
  });

  it('should create a highlight', async () => {
    const createHighlightDto = {
      text: 'Test Highlight',
      content: 'Test content',
    };
    const expectedResult = { id: '1', ...createHighlightDto };
    highlightsService.create.mockImplementationOnce(() =>
      Promise.resolve(expectedResult),
    );

    const result = await highlightsController.create(createHighlightDto);
    expect(result).toEqual(expectedResult);
    expect(highlightsService.create).toHaveBeenCalledWith(createHighlightDto);
  });

  it('should return all highlights', async () => {
    const expectedResult = [
      { id: '1', text: 'Test Highlight 1', content: 'Test content 1' },
      { id: '2', text: 'Test Highlight 2', content: 'Test content 2' },
    ];
    highlightsService.findAll.mockImplementationOnce(() =>
      Promise.resolve(expectedResult),
    );

    const result = await highlightsController.findAll();
    expect(result).toEqual(expectedResult);
    expect(highlightsService.findAll).toHaveBeenCalled();
  });
});
