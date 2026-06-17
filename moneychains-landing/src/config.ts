// Where the actual MoneyChains app lives. Override at build time with
// VITE_APP_URL (e.g. your deployed app domain). Defaults to the local dev app.
export const APP_URL = import.meta.env.VITE_APP_URL ?? "http://localhost:3000";
export const SIGNUP_URL = `${APP_URL}/signup`;
export const CONTACT_EMAIL = "hello@moneychains.app";
