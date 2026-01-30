export interface MenuItem {
  menuId: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  available: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  image?:File|null;
}
