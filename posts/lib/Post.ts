import { Title } from './Title';
import { Content } from './Content';

export class Post {
  private id?: number;
  private title: Title;
  private content: Content;

  constructor(title: string, content: string) {
    this.title = new Title(title);
    this.content = new Content(content);
  }

  public getTitle(): string { return this.title.getValue(); }
  public getContent(): string { return this.content.getValue(); }
  public getId(): number | undefined { return this.id; }
  public setId(id: number): void { this.id = id; }
}