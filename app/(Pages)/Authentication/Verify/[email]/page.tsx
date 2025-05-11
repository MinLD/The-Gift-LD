import Verify from "@/app/ComponentsAuthentication/Verify";
import React from "react";

type PageProps = {
  params: Promise<{
    email: string;
  }>;
};

async function VerifyPage({ params }: PageProps) {
  const { email } = await params; // Giải Promise
  const decodedEmail = decodeURIComponent(email || ""); // Mã hóa email

  return (
    <>
      <Verify email={decodedEmail} />
    </>
  );
}

export default VerifyPage;
