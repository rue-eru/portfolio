<h1 align=center>  Portfolio 2026  </h1>

<div align="left">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/next--intl-4-0070F3?style=for-the-badge&logo=next.js&logoColor=white" alt="Next-Intl" />
  <img src="https://img.shields.io/badge/i18n-EN/JA/RU-4ECDC4?style=for-the-badge" alt="i18n 3 Languages" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />

</div>

## 📋 Project Overview
My personal portfolio website built with Next.js, showcasing my projects and skills as a Frontend Developer & Translator.

> **Note for Japanese Recruiters**:  
> 日本語の説明が必要な場合は、[日本語版README](README.ja.md)をご覧ください。  
> 翻訳の経験を活かした国際化対応が得意です。


🔗 **Live Site:** [shigoto-el-portfolio.vercel.app](https://shigoto-el-portfolio.vercel.app)

<details>
<summary>Project Images</summary>

| Pages | Images |
|:-------:|:----------:|
| **Front Page** | ![Front Page ](./public/images/readme/front.png) |
| **Main Page** | ![Front Page JA](./public/images/readme/main.gif)|
| **Certificate Page** | ![Certificate Page EN](./public/images/readme/cert.png) | 
| **All Certificate Page** | ![All Certificate Page RU](./public/images/readme/all-cert.png) | 
</details>


## Key Features

- **Multilingual:** Full internationalization (EN/RU/JA) using `next-intl`
- **Modern Animations:** Smooth micro-interactions with [Motion](https://motion.dev/) (prev Framer Motion)
- **Responsive:** Optimized for all device sizes
- **Performance:** Built with Next.js 16 and React 19 for optimal speed
- **Accessibility:** Semantic HTML and keyboard navigation support

## Tech Stack

- **Framework:** Next.js 16, React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl
- **Deployment:** Vercel

### Additional tools used
- **Canvas Confetti** - Celebration effects on achievements
- **Sound Feedback** - Interactive audio cues using `use-sound`
- **Image Optimization** - Sharp for performant images
- **Interactive Games** - "FactsGame" in About section with collectibles
- **Custom Cursor** - Dynamic cursor effects
- **Responsive Design** - Optimized for all screen sizes

## Project Structure 

```
portfolio2026/
├── app/ # Next.js App Router
│ ├── [locale]/             # Internationalized routes (EN/RU/JA)
│ │ ├── certificates/       # Certificates showcase
│ │ ├── main/               # Main portfolio page
│ │ └── page.tsx            # Landing page
│ ├── components/           # All React components
│ │ ├── animations/         # Custom motion components
│ │ ├── AboutSection/       # About page with FactsGame
│ │ ├── ProjectsSection/    # Project cards with hover effects
│ │ └── ...
│ ├── data/                 # JSON data files
│ ├── hooks/                # Custom hooks (useCurrentLang)
│ └── utils/                # Utilities & interfaces
├── i18n/                   # Internationalization config
├── messages/               # Translation files (EN/RU/JA)
├── public/                 # Static assets
│ ├── images/               # All images organized by section
│ └── sounds/               # Sound effects for interactions
└── package.json            # Dependencies listed above
```