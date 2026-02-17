import React from "react";
import { cx } from "./utils";

export default function PageSection({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("scroll-mt-28", className)}>
      {children}
    </section>
  );
}
