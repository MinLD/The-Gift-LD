import { Search, ShoppingCart, User } from "lucide-react";

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

  {
    id: 4,
    name: "Về chúng tôi",
  },
  {
    id: 5,
    name: "Cửa hàng",
  },
  {
    id: 6,
    name: "Đối tác",
  },
];

const DataIcons = [
  {
    id: 0,
    name: Search,
  },
  {
    id: 1,
    name: User,
  },
  {
    id: 2,
    name: ShoppingCart,
  },
];

const dataHeader = [
  { id: 0, name: "Hotline: 0918 607 139" },
  { id: 1, name: "Email: hopevn@gmail.com" },
  { id: 2, name: "Miễn phí vận chuyển cho hóa đơn trên 500.000đ" },
];

export { DataIcons, DataHeaderBottom, dataHeader };
