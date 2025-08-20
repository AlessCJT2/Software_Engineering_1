export class Content {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("El contenido no puede estar vacío.");
    }
    this.value = value.trim();
  }

  public getValue(): string { return this.value; }
}