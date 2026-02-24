import type { Metadata } from "next";
import "../globals.css";
import { Dongle, M_PLUS_Rounded_1c } from "@/public/fonts";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('layout');
  return {
    title: t('metadata-title'),
    description: t('metadata-description'),
  };
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  
  console.log('Locale layout rendering with:', locale);
  console.log('Messages loaded for:', locale);
  
  return (
    <html lang={locale}>
      <body
        className={`${Dongle.variable} ${M_PLUS_Rounded_1c} antialiased`}
      >
        <NextIntlClientProvider
          locale={locale} messages={messages}
        >{children}
        </NextIntlClientProvider> 
      </body>
    </html>
  );
}
