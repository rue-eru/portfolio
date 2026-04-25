import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import HomePage from "../components/HomePage";

export default function Home({ params }: { params: Promise<{ locale: Locale}> }) {


  // Enable static rendering
  const { locale } = use(params);
  setRequestLocale(locale); //for server components


  return <HomePage />
}
