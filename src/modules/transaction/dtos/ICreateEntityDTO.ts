export default interface ICreateEntityDTO {
  product_id: string;
  origin_id?: string;
  destination_id?: string;
  quantity: string;
  type: string;
  user_id: string;
}
