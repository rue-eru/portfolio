export const styles = {
    divider: `border-t border-text-primary w-full -mt-20`,
    h3: `sm:text-5xl text-3xl text-center text-wrap w-fit lg:px-4 mx-auto mt-12 bg-set-accent -mb-8`,
    h1: `text-set-black bg-set-accent w-fit text-center my-4 rounded`,
    projectFlex : `flex flex-wrap justify-center items-center gap-10 w-fit p-4`,
    flexCenter: `flex justify-center items-center`,
    sectionWidth: `lg:w-[70%] w-[95%] mx-auto py-4 min-h-dvh w-full snap-start`,
    ulLiFlex: `flex flex-wrap justify-center gap-1`,
    toolDiv: `flex flex-col items-center p-12 w-fit md:w-160`,
    liStyle: `flex justify-center items-center gap-1.5 bg-gray-400/50 rounded-md p-1.5 w-fit`,
    liText: `text-set-white text-shadow-lg font-semibold text-shadow-set-black`,
    liHover: `bg-set-accent/90 transition-colors`,
    blurBgText: `text-set-white text-shadow-lg font-semibold text-shadow-set-black backdrop-blur-xs`,
    mobileScrollAnime1: `w-4 h-1 bg-set-white rounded-2xl rotate-30 -mr-0.5 animate-pulse`,
    mobileScrollAnime2: `w-4 h-1 bg-set-white rounded-2xl rotate-330 -ml-0.5 animate-pulse`,
    containerShadow: `shadow-black/50 shadow-xl`,

    //projects
    projectsSectionBtn: `bg-gray-600 cursor-pointer p-2 rounded transition-all xs:w-94 w-70 md:w-full hover:outline-set-accent hover:outline-3 hover:text-set-accent
    inline-flex md:justify-center justify-start items-center gap-2
    `,
    projectOpenBtn: `bg-set-accent text-gray-600 transition-colors hover:text-set-black outline-none`,

    //game-console styles
    consoleColor: `pink-400`,
    screenText: `text-sky-100 text-shadow-md text-shadow-indigo-950`,
    gameMainBtn: `w-20 h-20
        bg-linear-to-b from-pink-400 to-red-500
        border-b-4 border-red-800
        shadow-lg rounded-full
        flex items-center justify-center
        text-set-white
        transform hover:scale-105 transition`,
    gamePhoneBtns: `bg-pink-600 hover:bg-pink-500 transition-colors px-4 py-2 h-fit rounded text-white text-sm text-sky-100 text-shadow-md text-shadow-indigo-950`,
    gamePhoneBtnsEN: `bg-pink-600 hover:bg-pink-500 transition-colors px-4 pt-1 h-fit rounded text-white text-2xl text-sky-100 text-shadow-md text-shadow-indigo-950 uppercase`,
    startScreenContainer: `flex flex-row justify-end gap-2 transition-all`,
    progressBarColors: `h-full bg-linear-to-r from-sky-200 to-indigo-400  duration-300 z-50`,
    progressBarBorder: `bg-gray-700 rounded-full border border-gray-400  transition-all`,
    progressBarBG: `absolute z-40 bg-purple-200/80 `,
    overflowScreen: `overflow-y-auto
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-purple-200
        [&::-webkit-scrollbar-thumb]:rounded 
    `,

    ds:`bg-pink-600 hover:bg-pink-500 transition-colors px-4 py-2 h-fit rounded text-white text-sm text-sky-100 text-shadow-md text-shadow-indigo-950`,

    //certificates 
    accentHeader: `hover:bg-set-accent hover:text-set-black hover:p-5 transition-all`,
    navCert: `hover:bg-set-accent hover:text-set-black hover:outline-4 hover:outline-set-black/80 transition-all bg-set-black/80 cursor-pointer`,
    smallBtnsCertNav: `hover:bg-set-accent hover:text-set-black transition-all px-2 flex-1 text-center capitalize text-nowrap cursor-pointer`,
    arrowStyle: `absolute opacity-50 hover:opacity-100 transition-opacity cursor-pointer`,

    //contacts
    linkStyles: `flex gap-1.5 cursor-pointer hover:text-set-accent`,
    pulseContrast: `animate-pulse bg-linear-to-r from-lime-200 to-lime-600 bg-clip-text text-transparent font-bold`,

} as const 