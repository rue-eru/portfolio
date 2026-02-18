import localFont from "next/font/local"

export const Dongle = localFont({
    variable: "--font-dongle",
    src: [
    {
      path: './dongle-v16-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    }
  ]
})