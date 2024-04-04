import * as React from "react";

import Logo from "@/assets/logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AI 모드",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "연습 모드",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "멀티플레이어 모드",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "추후 개발 예정...",
    href: "/",
    description:
      "추후 더 많은 모드를 추가할 예정입니다. 많은 관심 부탁드립니다.",
  },
];

export default function NavBar() {
  return (
    <>
      <NavigationMenu className="w-full md:flex items-center justify-between px-10 max-h-[60px] hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>포리프-갈리</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/docs" title="소개">
                  할리갈리인데, 포리프입니다. 한국에서 가장 많이 팔린 게임,
                  할리갈리를 '포리프 버전'으로 즐겨보세요!
                </ListItem>
                <ListItem href="/docs/installation" title="진행 방식">
                  게임을 어떻게 진행하는 지 배워보세요.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="다운로드">
                  홈 화면에 바로가기를 추가해서 한 번의 탭으로 포리프-갈리를
                  즐겨보세요.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>게임 시작하기</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="https://github.com/opusdeisong/smart_boardgames"
              target="_blank"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                지금 개발에 참여하세요!
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <Logo width={80} />
      </NavigationMenu>
      <nav className="md:hidden">MOBILE NAVIGATION BAR</nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
