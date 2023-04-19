import { Injectable } from '@nestjs/common';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Highlight, HighlightDocument } from './schemas/highlight.schema';
import { Model } from 'mongoose';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class HighlightsService {
  private readonly openai: OpenAIApi;

  constructor(
    @InjectModel(Highlight.name)
    private readonly HighlightModel: Model<Highlight>,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async create(createMenuDto: CreateHighlightDto): Promise<HighlightDocument> {
    const { text } = createMenuDto;
    const summary = await this.summarize(text);

    const highlight = new this.HighlightModel({ text, summary });

    return highlight.save();
  }

  async summarize(text: string): Promise<string> {
    try {
      const result = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${text}\n\nTl;dr`,
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });

      return result.data.choices[0].text.trim();
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.HighlightModel.find();
  }
}
