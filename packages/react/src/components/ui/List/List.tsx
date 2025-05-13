import React from "react";

import clsx from "clsx";

/**
 * A generic List component that handles empty state and applies a wrapper <ul>.
 *
 * @template T - Type of each item in the list
 * @param items - Array of items to render
 * @param renderItem - Function that returns the content for each item (rendered inside <li>)
 * @param emptyMessage - Message to display when the list is empty
 * @param className - Tailwind (or other) classes for the <ul> container
 */
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function List<T>({ items, renderItem, className = "", itemClassName = "" }: ListProps<T>) {
  return (
    <ul className={clsx(className, "divide-y divide-gray-700")}>
      {items.map((item, idx) => (
        <li key={idx} className={itemClassName}>
          {renderItem(item, idx)}
        </li>
      ))}
    </ul>
  );
}

export default List;
