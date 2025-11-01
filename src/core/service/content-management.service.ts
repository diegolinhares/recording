import { Injectable } from '@nestjs/common';
import { Video } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../persistence/prisma/prisma.service';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  async createContent(createContentData: CreateContentData): Promise<Video> {
    const { title, description, url, thumbnailUrl, sizeInKb } =
      createContentData;
    const content = await this.prismaService.video.create({
      data: {
        id: randomUUID(),
        title,
        description,
        url,
        thumbnailUrl,
        sizeInKb,
        duration: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return content;
  }
}
