export default interface ICreateEntityDTO {
  name: string;
  picture: string;
  breed: string;
  born_at: string;
  gender: string;
  sociable: boolean;
  castrated: boolean;
  items: string;
  localization: string;
  vaccines: string;
  owner_id: string;
  note: string;
}
