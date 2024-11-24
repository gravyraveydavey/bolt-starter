import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/logo";
import config from "@/site-config";

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer className="container mt-auto mx-auto py-8">
            <Separator className="my-8" />
            <p className="text-sm text-muted-foreground">
                © {date} {config.title}. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
