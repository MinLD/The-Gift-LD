import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  const body = await request.json();
  const sessionToken = body.token;
  if (!sessionToken) {
    return Response.json(
      {
        message: "dont have token",
      },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    {
      message: "success",
      sessionToken,
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly=true; SameSite=Strict; Secure;`,
      },
    }
  );
};

export const GET = async () => {
  const cookie = await cookies();
  const sessionToken = cookie.get("sessionToken")?.value;
  if (!sessionToken) {
    return Response.json(
      { message: "No session token found" },
      { status: 401 }
    );
  }

  return Response.json({ token: sessionToken }, { status: 200 });
};

export const DELETE = async () => {
  return Response.json(
    {
      message: "success",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly=true; SameSite=Strict; Secure;`,
      },
    }
  );
};

export const profileUser = async () => {
  const cookie = await cookies();
  const sessionToken = cookie.get("sessionToken")?.value;

  if (!sessionToken) {
    return Response.json(
      { message: "No session token found" },
      { status: 401 }
    );
  }

  return Response.json({ token: sessionToken }, { status: 200 });
};
