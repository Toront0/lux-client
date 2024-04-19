import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (min: number, max: number, v: number) =>
  Math.min(Math.max(v, min), max);

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
});

export const formatTime = (time: Date, locales?: string) => {
  return new Intl.DateTimeFormat(locales, {
    dateStyle: "medium"
  }).format(new Date(time));
};

export const formatTimeDuration = (time: number) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
};

export function getNoun(
  number: number,
  one: string,
  two: string,
  five: string
) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" }
];

export function formatTimeAgo(date: Date, currLanguage: string) {
  let duration = (new Date(date).getTime() - new Date().getTime()) / 1000;

  const formatter = new Intl.RelativeTimeFormat(currLanguage, {
    numeric: "auto"
  });

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(
        Math.round(duration),
        division.name as Intl.RelativeTimeFormatUnit
      );
    }
    duration /= division.amount;
  }
}

import i18n from "@/app/config/i18n/i18n";
import { ChangeEvent } from "react";

export const getBase64Img = (
  e: ChangeEvent<HTMLInputElement>,
  sizeLimit: number = 2097152
): Promise<string> => {
  return new Promise((res, rej) => {
    if (e.target.files) {
      if (!e.target.files[0]) return;

      if (e.target.files[0].size > sizeLimit) {
        rej(i18n.t("imageFileTooBig"));
      }

      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        res(reader.result as string);
      };
    }
  });
};
