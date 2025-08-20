export class Title {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 5) {
      throw new Error("El título debe tener al menos 5 caracteres y no estar vacío.");
    }
    this.value = value.trim();
  }

  public getValue(): string { return this.value; }
}