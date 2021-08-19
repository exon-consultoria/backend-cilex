export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  person_id?: string;
  group_id?: string;
}
