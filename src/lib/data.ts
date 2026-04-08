export type Category = {
  id: string;
  name: string;
  order_index: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  is_veg: boolean;
  is_recommended: boolean;
  is_popular: boolean;
  is_in_stock: boolean;
  order_index: number;
};

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Snacks', order_index: 0 },
  { id: '2', name: 'Meals', order_index: 1 },
  { id: '3', name: 'Beverages', order_index: 2 },
  { id: '4', name: 'Combos', order_index: 3 },
];

export const MOCK_MENU: MenuItem[] = [
  {
    id: '101',
    name: 'Kokonut Special Sandwich',
    description: 'Triple layer club sandwich with fresh coconut chutney and grilled veggies.',
    price: 180,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80',
    category_id: '1',
    is_veg: true,
    is_recommended: true,
    is_popular: true,
    is_in_stock: true,
    order_index: 0,
  },
  {
    id: '102',
    name: 'Spicy Paneer Wrap',
    description: 'Grilled paneer strips with spicy mayo and crunchy lettuce.',
    price: 150,
    image_url: 'https://images.unsplash.com/photo-1626700051175-656fc7c05047?w=500&q=80',
    category_id: '1',
    is_veg: true,
    is_recommended: false,
    is_popular: true,
    is_in_stock: true,
    order_index: 1,
  },
  {
    id: '201',
    name: 'Chicken Steak Meal',
    description: 'Herb-crusted chicken breast served with mashed potatoes and sautéed greens.',
    price: 350,
    image_url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80',
    category_id: '2',
    is_veg: false,
    is_recommended: true,
    is_popular: false,
    is_in_stock: true,
    order_index: 0,
  },
  {
    id: '301',
    name: 'Iced Mint Mocha',
    description: 'Chilled espresso with rich chocolate and a hint of fresh mint.',
    price: 120,
    image_url: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?w=500&q=80',
    category_id: '3',
    is_veg: true,
    is_recommended: true,
    is_popular: true,
    is_in_stock: true,
    order_index: 0,
  },
  {
    id: '302',
    name: 'Tender Coconut Shake',
    description: 'Our signature shake made with fresh tender coconut pulp.',
    price: 140,
    image_url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bee?w=500&q=80',
    category_id: '3',
    is_veg: true,
    is_recommended: true,
    is_popular: true,
    is_in_stock: false,
    order_index: 1,
  },
  {
    id: '401',
    name: 'Lunch Combo',
    description: 'Sandwich + Choice of Beverage + Mini Salad. Save ₹40',
    price: 260,
    image_url: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=500&q=80',
    category_id: '4',
    is_veg: true,
    is_recommended: false,
    is_popular: true,
    is_in_stock: true,
    order_index: 0,
  },
];
