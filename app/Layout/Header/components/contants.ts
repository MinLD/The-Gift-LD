import { Bell, Languages, Search, ShoppingCart, User } from "lucide-react";

type Props = {
  id: number;
  name: string;
  subitems?: {
    id: number;
    name: string;
  }[];
};

const DataHeaderBottom: Props[] = [
  {
    id: 0,
    name: "Quà Dịp Lễ",
    subitems: [
      {
        id: 0,
        name: "Quà Dịp Lễ",
      },
      {
        id: 1,
        name: "Quà Dịp Lễ",
      },
      {
        id: 2,
        name: "Quà Dịp Lễ",
      },
    ],
  },
  {
    id: 1,
    name: "Quà Doanh Nghiệp",
  },
  {
    id: 2,
    name: "Nam",
  },
  {
    id: 3,
    name: "Nữ",
  },
];

const DataIcons = [
  {
    id: 0,
    name: Search,
  },

  {
    id: 2,
    name: ShoppingCart,
  },
  {
    id: 3,
    name: Bell,
    label: "Thông Báo",
  },

  {
    id: 1,
    name: User,
  },
];

const dataHeader = [
  { id: 0, name: "Hotline: 0918 607 139" },
  { id: 1, name: "Email: TheGiftLD@gmail.com" },
  { id: 2, name: "Miễn phí vận chuyển cho hóa đơn trên 500.000đ" },
];

export { DataIcons, DataHeaderBottom, dataHeader };
