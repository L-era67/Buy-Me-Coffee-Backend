import { Response, Request } from "express";
import { prisma } from "../../utils/prisma";

export const getProfileExplore = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    console.log("page:", page);

    // take ni 3 baiwal 1,2,3,4,5,6,7
    // p-1 1*3 || p-2 2*3=6 6-3(takeData) =3 => 3-g skip hiin

    const totalUsers = await prisma.profile.count();

    const takeData = 4;
    const skipData = Number(page) * takeData - takeData; // page-2 bol 2*5=10 endees suuliin 5(takedata) awaad uldesniiin zailuulan 10-5(takedata)=umnuh page1-n data

    const usersProfile = await prisma.profile.findMany({
      skip: skipData,
      take: takeData,
      include: {
        user: {
          select: {
            username: true,
          },
        },
        
      },
    });
    
    const totalPage = Math.ceil(totalUsers/takeData)

    res.status(200).json({ usersProfile, totalUsers, totalPage });
  } catch (error) {
    res.status(500).json({ error });
  }
};


//1,2,3,4,5,6,7 hoyr hoyror harhuulah
// page  takedata-2
// p1 1,2 1*2=2 
// p2 2*2   1,2 || 3,4 skip-2 ; take-2 4-2=skipdata
// p3 2*3   1,2,3,4 || 5,6   skip-4 ; take-2 6-takedate =skipdata-n utga => 4 