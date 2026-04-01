import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/cn";
import { plateSpring } from "../../lib/motion";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

type LinkButtonProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
  type?: never;
  onClick?: never;
};

type ActionButtonProps = SharedProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick" | "type"> & {
    href?: never;
    target?: never;
    rel?: never;
  };

const baseClassName =
  "inline-flex items-center justify-center gap-3 border px-5 py-3 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em]";

function getVariantClassName(variant: "primary" | "secondary") {
  return variant === "primary"
    ? "border-ink bg-industrial-gold text-ink shadow-plate"
    : "border-ink/20 bg-white text-ink shadow-plate-sm";
}

export function PrimaryButton(props: LinkButtonProps | ActionButtonProps) {
  const combinedClassName = cn(baseClassName, getVariantClassName(props.variant ?? "primary"), props.className);

  if ("href" in props && props.href) {
    return (
      <motion.a
        className={combinedClassName}
        href={props.href}
        rel={props.rel}
        target={props.target}
        transition={plateSpring}
        whileHover={{ x: -4, y: -4 }}
        whileTap={{ x: 2, y: 2 }}
      >
        {props.children}
      </motion.a>
    );
  }

  const buttonProps = props as ActionButtonProps;

  return (
    <motion.button
      className={combinedClassName}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      transition={plateSpring}
      type={buttonProps.type ?? "button"}
      whileHover={{ x: -4, y: -4 }}
      whileTap={{ x: 2, y: 2 }}
    >
      {buttonProps.children}
    </motion.button>
  );
}
