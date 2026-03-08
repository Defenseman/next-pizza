import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";

export async function GET() {
  try {
    const user = await getUserSession();
    if (!user) {
      return Response.json({ error: "Вы не авторизованы" }, { status: 401 });
    }
    
    const data = await prisma.user.findFirst({
      where: {
        id: Number(user.id),
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: false,
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "[USER_GET] Server Error" }, { status: 500 });
  }
}
