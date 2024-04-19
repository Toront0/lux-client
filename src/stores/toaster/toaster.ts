import { createRef } from "react";

import { create } from "zustand";
import { IUseToaster } from "./toaster.types";

export const useToaster = create<IUseToaster>((set, get) => ({
  toasts: [],
  addToast(v) {
    const toast = {
      id: self.crypto.randomUUID(),
      ...v,
      ref: createRef()
    };
    set({ toasts: get().toasts.concat(toast) });
  },
  deleteToast(id) {
    set({ toasts: get().toasts.filter((v) => v.id !== id) });
  }
}));
