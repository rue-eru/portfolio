'use client'

export default function CreditFooter () {

    return (
        <footer
            className="text-font-accent text-set-white/80
            "
        >
          <p>© {new Date().getFullYear()}
            <a 
                className="cursor-pointer hover:text-set-accent"
                href="https://github.com/rue-eru"
                target="_blank"
                rel="noopener noreferrer"
            > L </a> 
            — Built with Next.js</p>
          <p>Designed & developed by me</p>
        </footer>
    )
}