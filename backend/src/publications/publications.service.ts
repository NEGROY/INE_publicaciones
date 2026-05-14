import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import {
  Publication,
  PublicationDocument,
} from './schemas/publication.schema';

import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name)
    private publicationModel: Model<PublicationDocument>,
  ) {}

  async create(
    createPublicationDto: CreatePublicationDto,
  ) {
    const publication = new this.publicationModel(
      createPublicationDto,
    );

    return await publication.save();
  }

  async findAll() {
    return await this.publicationModel
      .find()
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const publication =
      await this.publicationModel.findById(id);

    if (!publication) {
      throw new NotFoundException(
        'Publication not found',
      );
    }

    return publication;
  }

  async update(
    id: string,
    updatePublicationDto: UpdatePublicationDto,
  ) {
    const updatedPublication =
      await this.publicationModel.findByIdAndUpdate(
        id,
        updatePublicationDto,
        {
          new: true,
        },
      );

    if (!updatedPublication) {
      throw new NotFoundException(
        'Publication not found',
      );
    }

    return updatedPublication;
  }

  async remove(id: string) {
    const deletedPublication =
      await this.publicationModel.findByIdAndDelete(id);

    if (!deletedPublication) {
      throw new NotFoundException(
        'Publication not found',
      );
    }

    return {
      message: 'Publication deleted successfully',
    };
  }
}