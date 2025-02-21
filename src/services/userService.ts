import { count, desc, eq } from "drizzle-orm";
import { readings, users } from "../../drizzle/schema";
import { drizzleInstance } from "../drizzleDatabase/db";

export const processWebhookForUser = async (params: {
  email: string;
  resourceId?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_channel?: string;
}) => {
  const {
    email,
    resourceId,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_channel,
  } = params;

  const user = await drizzleInstance
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();
  if (!user) {
    throw new Error("User not found");
  }

  await drizzleInstance.insert(readings).values({
    resourceId: resourceId || null,
    utmSource: utm_source || null,
    utmMedium: utm_medium || null,
    utmCampaign: utm_campaign || null,
    utmChannel: utm_channel || null,
    userId: user.id,
  });

  const lastLogin = new Date(user.lastLogin);
  const today = new Date();
  const todayDay = today.getDay();

  let newStreak = user.streak;
  if (todayDay !== 0) {
    const diffTime = today.getTime() - lastLogin.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

    if (diffDays === 1) {
      newStreak = user.streak + 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  await drizzleInstance
    .update(users)
    .set({
      streak: newStreak,
      lastLogin: today,
    })
    .where(eq(users.email, email));

  return await drizzleInstance
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();
};

export const getUserInfo = async (email: string) => {
  const user = await drizzleInstance
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getEngagementMetrics = async () => {
  const totalUsers =
    (await drizzleInstance.select({ count: count() }).from(users).get()
      ?.count) ?? 0;
  const totalReadings =
    (await drizzleInstance.select({ count: count() }).from(readings).get()
      ?.count) ?? 0;

  return {
    totalUsers,
    totalReadings,
  };
};

export const getEngagedUsersRanking = async () => {
  return await drizzleInstance
    .select()
    .from(users)
    .orderBy(desc(users.streak))
    .limit(10)
    .all();
};
