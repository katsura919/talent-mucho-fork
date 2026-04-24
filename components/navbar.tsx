"use client";

import * as React from "react";
import Link from "next/link";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Vercel } from "@aliimam/logos";
import { cn } from "@/lib/utils";
import {
  Bot,
  Box,
  Calendar1,
  ChartNoAxesColumnIncreasing,
  Cpu,
  AArrowUp,
  Globe,
  LayoutGrid,
  PenTool,
  ScanText,
  Shield,
  Smile,
  Sparkle,
  BookText,
  BriefcaseBusiness,
  Code,
  Component,
  Codepen,
  Network,
  Sparkles,
  ScreenShare,
  AppWindow,
  Layers,
  Monitor,
  Moon,
  Sun,
  CirclePlus,
  LogOut,
} from "@aliimam/icons";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import Image from "next/image";

const ourStudio: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
  isService?: boolean;
}[] = [
    {
      title: "Services",
      href: "/#services",
      icon: <LayoutGrid strokeWidth={2} />,
      description: "Curated remote staffing and digital solutions.",
    },
    {
      title: "Process",
      href: "/#process",
      icon: <Box strokeWidth={2} />,
      description: "Our streamlined methodology for building teams.",
    },
    {
      title: "Why Us",
      href: "/#why-us",
      icon: <Shield strokeWidth={2} />,
      description: "Global talent studio with a boutique approach.",
    },
    {
      title: "Virtual Assistants",
      href: "/services/virtual-assistants",
      icon: <BriefcaseBusiness strokeWidth={2} />,
      description: "Trained, vetted VAs matched to your business goals.",
      isService: true,
    },
    {
      title: "Personal Branding",
      href: "/services/personal-branding",
      icon: <Sparkles strokeWidth={2} />,
      description: "Authority-building content and profile strategy.",
      isService: true,
    },
    {
      title: "Marketing & Strategy",
      href: "/services/marketing",
      icon: <ChartNoAxesColumnIncreasing strokeWidth={2} />,
      description: "Brand positioning, social media, and SEO.",
      isService: true,
    },
    {
      title: "Websites & Pages",
      href: "/services/websites",
      icon: <AppWindow strokeWidth={2} />,
      description: "Conversion-focused sites and custom web systems.",
      isService: true,
    },
  ];

const insights: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
    {
      title: "Blog",
      href: "/blog",
      icon: <BookText strokeWidth={2} />,
      description: "Latest insights on distributed teams and remote work.",
    },
  ];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActiveHref = (href: string) => {
    if (!href) return false;
    const [path, hash] = href.split("#");
    if (hash) {
      return pathname === path && currentHash === `#${hash}`;
    }
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      className={`relative px-4 py-3 w-full transition-all duration-300 ${scrolled ? "bg-white" : "bg-transparent py-2"
        }`}
    >
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/tm-logo.png"
              alt="Talent Mucho"
              width={140}
              height={40}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-8 font-medium text-espresso-800 bg-transparent hover:bg-beige-100"
                  )}
                >
                  Our Studio
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border-beige-200 shadow-xl">
                  <div className="w-[540px] p-4">
                    <ul className="grid grid-cols-2 gap-2 mb-3">
                      {ourStudio.filter(c => !c.isService).map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                          isActive={isActiveHref(component.href)}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="border-t border-beige-100 pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-taupe-400 px-2 mb-2">Our Services</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {ourStudio.filter(c => c.isService).map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            icon={component.icon}
                            href={component.href}
                            isActive={isActiveHref(component.href)}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Insights hidden until ready */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-8 font-medium bg-transparent hover:bg-beige-100 px-4",
                    isActiveHref("/contact") ? "text-white" : "text-espresso-800"
                  )}
                >
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-8 font-medium bg-transparent hover:bg-beige-100 px-4",
                    isActiveHref("/offers") ? "text-white" : "text-espresso-800"
                  )}
                >
                  <Link href="/offers">Limited Offers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <a
              href="/booking"
              className="btn-primary text-sm py-2 px-6 rounded-full"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal-900 hover:bg-beige-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-beige-50 z-50 shadow-2xl flex flex-col lg:hidden border-r border-beige-200"
            >
              <div className="p-6 flex items-center justify-between border-b border-beige-200/50 flex-shrink-0">
                <Image
                  src="/tm-logo.png"
                  alt="Talent Mucho"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-charcoal-900 hover:bg-beige-200/50 rounded-full transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-8">
                <div>
                  <h4 className="text-xs font-semibold text-clay-500 uppercase tracking-widest mb-4">Our Studio</h4>
                  <div className="flex flex-col gap-3">
                    {ourStudio.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-beige-100 transition-colors border border-transparent hover:border-beige-200/50"
                      >
                        <div className="mt-0.5 text-clay-500 bg-white p-2 rounded-lg border border-beige-200 shadow-sm shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                        </div>
                        <div>
                          <div
                            className={cn(
                              "font-medium",
                              isActiveHref(item.href)
                                ? "text-white"
                                : "text-charcoal-900"
                            )}
                          >
                            {item.title}
                          </div>
                          <div
                            className={cn(
                              "text-xs mt-1 leading-relaxed",
                              isActiveHref(item.href)
                                ? "text-white"
                                : "text-taupe-500"
                            )}
                          >
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-clay-500 uppercase tracking-widest mb-4">Insights</h4>
                  <div className="flex flex-col gap-3">
                    {insights.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-beige-100 transition-colors border border-transparent hover:border-beige-200/50"
                      >
                        <div className="mt-0.5 text-clay-500 bg-white p-2 rounded-lg border border-beige-200 shadow-sm shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                        </div>
                        <div>
                          <div
                            className={cn(
                              "font-medium",
                              isActiveHref(item.href)
                                ? "text-white"
                                : "text-charcoal-900"
                            )}
                          >
                            {item.title}
                          </div>
                          <div
                            className={cn(
                              "text-xs mt-1 leading-relaxed",
                              isActiveHref(item.href)
                                ? "text-white"
                                : "text-taupe-500"
                            )}
                          >
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-beige-200/50 bg-white shrink-0">
                <a
                  href="/booking"
                  className="flex items-center justify-center w-full py-4 bg-charcoal-900 text-beige-50 font-medium rounded-xl shadow-lg hover:bg-clay-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Strategy Call
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ListItem({
  title,
  icon,
  children,
  href,
  isActive,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: ReactElement;
  isActive?: boolean;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-transparent">
        <Link href={href}>
          <div className="flex gap-3 items-start rounded-md p-2">
            <div className="border rounded-sm p-2 icon-container">{icon}</div>
            <div className="text-container">
              <div
                className={cn(
                  "text-sm font-medium leading-none",
                  isActive ? "text-white" : undefined
                )}
              >
                {title}
              </div>
              <p
                className={cn(
                  "line-clamp-2 pt-1 text-xs leading-snug",
                  isActive ? "text-white" : "text-muted-foreground"
                )}
              >
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>

      <style jsx>{`
        li:hover .icon-container {
          background-color: var(--foreground);
          color: var(--background);
          transform: scale(1.05);
          transition: all 0.2s ease;
        }

        li:hover .text-container .text-sm {
          color: var(--foreground); /* Change title color on hover */
          transition: color 0.2s ease;
        }

        li:hover .text-container p {
          color: var(--foreground); /* Change description color on hover */
          transition: color 0.2s ease;
        }
      `}</style>
    </li>
  );
}



const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  value?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
  defaultValue?: "light" | "dark" | "system";
  className?: string;
};

const ThemeSwitcher = ({
  className,
}: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-5 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-secondary" />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-3.5 w-3.5",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
