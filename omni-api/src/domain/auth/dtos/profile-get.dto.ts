export class ProfileGetDto {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
  ) {}
}
