export class Budget {
  constructor(
    public readonly id: string,
    public readonly category: string,
    public readonly limit: number,
    /** Formato 'YYYY-MM' — un presupuesto es por categoría y por mes */
    public readonly month: string,
  ) {}
}
