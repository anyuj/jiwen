import { cn } from "@jiwen/ui/lib/utils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { motion, useScroll, useTransform } from "motion/react";

const NavHeader = ({ className }: { className?: string }) => {
  const { scrollY } = useScroll();

  const logoScale = useTransform(scrollY, [0, 50], [1, 0.8]);
  const logoY = useTransform(scrollY, [0, 50], [0, -10]);

  return (
    <div
      className={cn(
        "font-geist relative h-(--header-height) w-full shrink-0",
        className,
      )}
    >
      {/* update the top px  */}
      <div className="sticky top-[23px] z-10">
        <motion.svg
          style={{
            scale: logoScale,
            y: logoY,
          }}
          className="absolute left-4 z-10 size-5 lg:left-6"
          aria-label="Vercel Logo"
          viewBox="0 0 75 65"
          fill="currentColor"
          height="22"
        >
          <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
        </motion.svg>
      </div>
      <header className="bg-sidebar flex gap-4 px-16 py-2 text-sm">
        <ol className="flex items-center gap-4">
          <li aria-hidden className="text-lg opacity-35">
            /
          </li>
          <li className="flex items-center gap-2">
            <span className="size-4.5 inline-flex items-center justify-center overflow-hidden rounded-full">
              <img
                src="https://avatar.vercel.sh/skiper"
                alt="logo"
                className="size-full object-cover"
              />
            </span>
            <p>gxuri's projects</p>
            <p className="bg-muted2 rounded-full px-2 py-px text-[11px]">
              Hobby
            </p>
            <button
              type="button"
              className="cursor-pointer -space-y-1 rounded-md px-2 py-2 text-[#919191] hover:bg-[#232323]"
            >
              <IconChevronUp className="stroke-4 block size-3" />
              <IconChevronDown className="stroke-4 block size-3" />
            </button>
          </li>
          <li aria-hidden className="hidden text-lg opacity-35 lg:block">
            /
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <span className="size-4.5 inline-flex items-center justify-center rounded-full">
              <img src="/logos/logo.svg" alt="logo" />
            </span>
            hi
            <button
              type="button"
              className="cursor-pointer -space-y-1 rounded-md px-2 py-2 text-[#919191] hover:bg-[#232323]"
            >
              <IconChevronUp className="stroke-4 block size-3" />
              <IconChevronDown className="stroke-4 block size-3" />
            </button>
          </li>
        </ol>
      </header>
    </div>
  );
};

export { NavHeader };
