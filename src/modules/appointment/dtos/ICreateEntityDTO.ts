export default interface ICreateEntityDTO {
  owner_id: string;
  recurrence?: string;
  work_id: string;
  pet_id: string;
  date: string;
  hour: string;
  done: boolean;
}
