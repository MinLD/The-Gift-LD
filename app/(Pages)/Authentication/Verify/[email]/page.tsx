import Verify from "@/app/ComponentsAuthentication/Verify";
import React from "react";
function VerifyPage({ params }: { params: { email?: string | undefined } }) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email || ""); //để mã hóa email
  return (
    <>
      <Verify email={decodedEmail} />
    </>
  );
}

export default VerifyPage;
