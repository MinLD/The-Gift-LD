import { myInfo } from "@/app/Service/User";
import { create } from "zustand";

interface Profile {
  address: string;
  city: string;
  country: string;
  dob: string;
  gender: string;
  id: number;
  phone: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  profileUser: Profile;
  roles: [
    {
      name: string;
      description: string;
      permissions: [];
    }
  ];
}

interface ProfileState {
  User: User | null;
  isLoadingg: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  Avt: string;
}

export function getInitials(name: string): string {
  // Loại bỏ khoảng trắng thừa và tách thành mảng các từ
  const words = name.trim().split(/\s+/);

  // Lấy 2 từ cuối (nếu có ít hơn 2 từ, lấy tất cả)
  const lastTwoWords = words.slice(-2);

  // Lấy chữ cái đầu của mỗi từ và gộp lại
  const initials = lastTwoWords
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  // Trả về 2 ký tự đầu tiên (hoặc ít hơn nếu không đủ)
  return initials.slice(0, 2);
}
// Tạo Zustand store
export const useProfileStore = create<ProfileState>((set) => ({
  User: null,
  isLoadingg: false,
  error: null,
  Avt: "",

  fetchProfile: async () => {
    set({ isLoadingg: true });
    myInfo()
      .then((res) => {
        console.log(res?.data?.result);
        set({ User: res?.data?.result, isLoadingg: false });
        set({ Avt: getInitials(res?.data?.result?.fullName) });
      })
      .catch((err) => {
        console.log(err);
        set({ error: err, isLoadingg: false });
      });
  },
}));
