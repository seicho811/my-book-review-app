import type { PropsWithChildren, HTMLAttributes } from "react";
import style from "./Card.module.css";

export function Card({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`${style.card} ${className}`}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`${style.header} ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`${style.content} ${className}`}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`${style.footer} ${className}`}
      {...props}
    />
  );
}
