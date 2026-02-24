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

export const M_PLUS_Rounded_1c = localFont({
  variable: "--font-m-plus",
  src: [
    {
      path: './m-plus-rounded-1c-v20-cyrillic_japanese_latin-regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ]
})
