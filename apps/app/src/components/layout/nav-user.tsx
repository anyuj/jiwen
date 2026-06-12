import { allLocales, type Locale, localeDisplayNames } from "@jiwen/config";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@jiwen/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@jiwen/ui/components/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@jiwen/ui/components/item";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@jiwen/ui/components/sidebar";
import {
  IconBell,
  IconCheck,
  IconCreditCard,
  IconLanguage,
  IconLogout,
  IconRosetteDiscountCheck,
  IconSelector,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;
  const handleLocaleChange = (locale: Locale) => {
    i18n.changeLanguage(locale);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:translate-x-px group-data-[collapsible=icon]:transition-none!"
              />
            }
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <IconSelector className="group-data-[collapsible=icon]:hidden" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <Item size="xs">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{user.name}</ItemTitle>
                    <ItemDescription> {user.email}</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconSparkles />
                {t("upgradeToPro")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconRosetteDiscountCheck />
                {t("account")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                {t("billing")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconBell />
                {t("notifications")}
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="[&>svg:last-child]:hidden">
                  <IconLanguage />
                  {t("languages")}
                  <span className="ml-auto text-xs font-medium text-muted-foreground mr-1">
                    {currentLocale.startsWith("zh")
                      ? "ZH"
                      : currentLocale.toUpperCase()}
                    /{localeDisplayNames[currentLocale as Locale]}
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="min-w-30">
                    {allLocales.map((locale) => (
                      <DropdownMenuItem
                        key={locale}
                        onClick={() => handleLocaleChange(locale)}
                      >
                        {locale === i18n.language ? (
                          <span className="flex items-center w-full">
                            {localeDisplayNames[locale]}
                            <IconCheck className="ml-auto" />
                          </span>
                        ) : (
                          localeDisplayNames[locale]
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <IconSettings />
                {t("settings")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              {t("logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
