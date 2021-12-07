export default interface ICreateEntityDTO {
  name: string;
  breed?: string;
  born_at?: string;
  gender?: string;
  sociable?: boolean;
  castrated?: boolean;
  items?: string;
  enclosure_id?: string;
  owner_id: string;
  note?: string;
}
