import { IUser } from '@/shared/model/user.model';
import { ICategory } from '@/shared/model/category.model';

export interface IPost {
  id?: number;
  title?: string | null;
  content?: string | null;
  coverImageUrl?: string | null;
  author?: IUser | null;
  category?: ICategory | null;
  excerpt?: string | null;
}

export class Post implements IPost {
  constructor(
    public id?: number,
    public title?: string | null,
    public content?: string | null,
    public coverImageUrl?: string | null,
    public author?: IUser | null,
    public category?: ICategory | null,
    public excerpt?: string | null
  ) {}
}
