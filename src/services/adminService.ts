import { avg, count, desc } from "drizzle-orm";
import { users } from "../../drizzle/schema";
import { drizzleInstance } from "../drizzleDatabase/db";

export const getAdminMetrics = async () => {
  const totalUsersResult = await drizzleInstance
    .select({ count: count() })
    .from(users)
    .get();
  const totalUsers = totalUsersResult?.count ?? 0;

  const averageStreakResult = await drizzleInstance
    .select({ average: avg(users.streak) })
    .from(users)
    .get();
  const averageStreak = averageStreakResult?.average ?? 0;

  const ranking = await drizzleInstance
    .select()
    .from(users)
    .orderBy(desc(users.streak))
    .limit(10)
    .all();

  return { totalUsers, averageStreak, ranking };
};
