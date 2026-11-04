import { useMediaQuery } from "./useMediaQuery";

/** true sur desktop avec souris (pointeur précis). */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}
