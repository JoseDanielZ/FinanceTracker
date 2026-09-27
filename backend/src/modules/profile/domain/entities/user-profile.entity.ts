// Entidad de dominio: el perfil del usuario. App de un solo usuario,
// así que siempre hay una única fila (id fijo 'me').
export class UserProfile {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email?: string,
  ) {}
}
