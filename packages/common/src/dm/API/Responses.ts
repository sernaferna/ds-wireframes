export interface ResponseMessage {
  msg: string;
  details?: string;
  code?: number;
}

export const ItemRemovedResponse: ResponseMessage = { msg: 'Item Removed' };
