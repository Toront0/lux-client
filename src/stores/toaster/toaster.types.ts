import { RefObject } from "react";

export type CreateToast = {
  title?: string;
  subtitle?: string;
  img?: string;
  type: "message";
};

export type ToastType = {
  id: string;
  title?: string;
  subtitle?: string;
  img?: string;
  type: "message";
  ref: RefObject<HTMLElement | undefined>;
};

export interface IUseToaster {
  toasts: ToastType[];
  addToast: (v: CreateToast) => void;
  deleteToast: (id: string) => void;
}
