import { cookies } from "next/headers";

const COOKIE = "labmeet_admin";
const TOKEN = "ok";

function getPassword(): string {
  return process.env.ADMIN_PASSWORD || "foqal1!";
}

export function checkPassword(input: string): boolean {
  return input === getPassword();
}

export function isAuthed(): boolean {
  return cookies().get(COOKIE)?.value === TOKEN;
}

export function setAdminCookie() {
  cookies().set({
    name: COOKIE,
    value: TOKEN,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE);
}
