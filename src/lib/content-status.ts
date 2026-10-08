export type ContentStatus = "published" | "needs-input" | "draft";

export interface PublishableItem {
  status?: ContentStatus;
  isPlaceholder?: boolean;
}

/**
 * Returns true if the content item is approved and ready for public display.
 * Items marked as "needs-input", "draft", or with `isPlaceholder: true` are hidden.
 */
export function isPublishable(item: PublishableItem | null | undefined): boolean {
  if (!item) return false;
  if (item.isPlaceholder === true) return false;
  return item.status === "published";
}

/**
 * Filter an array of items, returning only publishable items.
 */
export function getPublishableItems<T extends PublishableItem>(items: T[]): T[] {
  return items.filter(isPublishable);
}
