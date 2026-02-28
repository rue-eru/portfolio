export const styles = {
    divider: `border-t border-text-primary w-full -mt-20`,
    h3: `text-5xl text-center w-fit lg:px-4 mx-auto mt-12 bg-set-accent -mb-8`,
    h1: `text-set-black bg-set-accent w-fit text-center my-4 rounded`,
    projectFlex : `flex flex-wrap justify-center items-center gap-10 w-fit `,
    flexCenter: `flex justify-center items-center`,
    sectionWidth: `lg:w-[70%] sm:w-[95%] mx-auto py-4 main-page min-h-dvh w-full`,
    ulLiFlex: `flex flex-wrap justify-center gap-1`,
    toolDiv: `flex flex-col items-center p-12 w-fit md:w-160`,
    liStyle: `flex justify-center items-center gap-1.5 bg-gray-300/50 rounded-md p-1.5 w-fit`,
    liHover: `bg-set-accent/90 transition-colors`,

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
    
    ds:`bg-pink-600 hover:bg-pink-500 transition-colors px-4 py-2 h-fit rounded text-white text-sm text-sky-100 text-shadow-md text-shadow-indigo-950`

} as const 