import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/logo";
import config from "@/site-config";
import ThemeSwitcher from "@/components/theme-switcher";

const NavBar = async () => {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link
                        className="mr-4 flex items-center space-x-2 lg:mr-6"
                        href="/"
                    >
                        <Logo />
                        <span className="hidden font-bold text-primary lg:inline-block">
                            {config.title}
                        </span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        {
                            // links here
                        }
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <ThemeSwitcher />
                    </nav>
                </div>
            </div>
        </header>
    );
};
export default NavBar;
