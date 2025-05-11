"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import MyHeader from "@/app/Layout/Header";
import MyFooter from "@/app/Layout/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { StoreProvider } from "@/app/Context/StoreProvider";

import { AuthProvider } from "@/app/Context/AuthProvider";
import { useProfileStore } from "@/app/zustand/store";
import { Suspense, useEffect } from "react";
import LoadingOverlay from "@/app/Components/LoaddingOverlay";
import HamburgerMenu from "@/app/Components/HamburgerMenu";

const roboto = Roboto({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Danh sách các trang không dùng layout root
  const excludedPages = ["Authentication", "accounts"]; // Thêm các trang khác nếu cần

  // Kiểm tra xem trang hiện tại có nằm trong danh sách excludedPages không
  const isExcludedPage = excludedPages.some((page) =>
    pathname?.split("/").includes(page)
  );

  const { fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <html lang="vi" className={roboto.className}>
      <body className={roboto.className}>
        <AuthProvider>
          <StoreProvider>
            {!isExcludedPage && <MyHeader />}
            <Suspense
              fallback={
                <div className="loading ">
                  <LoadingOverlay message="Vui lòng chờ tải trang" />
                </div>
              }
            >
              {children}
            </Suspense>
            {!isExcludedPage && <MyFooter />}

            <HamburgerMenu />
          </StoreProvider>
        </AuthProvider>

        <Toaster
          richColors
          duration={1500}
          position="top-right"
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </body>
    </html>
  );
}
