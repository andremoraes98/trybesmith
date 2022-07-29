export interface Order {
  id?: number,
  userId: number,
}

export interface OrderProduct extends Order {
  productIds: number[],
}