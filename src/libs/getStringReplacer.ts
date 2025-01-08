import { createElement, Fragment, type ReactElement } from "react";
import type { GetStringReplacerArgs } from "../types";


export const getStringReplacer = <
  Start extends string,
  End extends string,
  EndOfLine extends string = End
>(
  start: Start,
  end: End
) => {
  const replaceKey = <T extends string>(
    template: T,
    ...args: GetStringReplacerArgs<T, Start, End, EndOfLine>
  ) => {
    const [replacements = {}] = args ?? [];

    const jsxElement = mapJsxElements({
      start,
      end,
      replacements,
      template,
    });

    if (jsxElement) return jsxElement;

    return Object.entries(replacements).reduce((acc = "", [key, value]) => {
      const regex = `${start}${key}${end}`;
      return acc.replace(regex, String(value ?? ""));
    }, template as string) as T;
  };

  return replaceKey;
};

function mapJsxElements(params: {
  start: string;
  end: string;
  template: string;
  replacements: Record<string, string | number | ReactElement>;
}) {
  const { end, replacements, start, template } = params;
  const specialChar = ["{", "}", "[", "]", ".", "|", "/", "$"];

  const isJsx = Object.values(replacements).some(
    (value) => !["string", "number", "boolean"].includes(typeof value)
  );

  if (!isJsx) return null;

  const cleanChars = (str: string) =>
    str
      .split("")
      .map((c) => {
        const newC = specialChar.includes(c) ? `${c}` : c;
        return newC;
      })
      .join("");

  const regexString = `(${cleanChars(start)}.*?${cleanChars(end)})`;
  const regex = new RegExp(regexString);

  const parts = template.split(regex);

  // Replace placeholders with corresponding JSX elements or leave the string unchanged.
  const elements = parts.map((part, index) => {
    const regexString = `${cleanChars(start)}(.*)${cleanChars(end)}`;
    const regex = new RegExp(regexString);
    const match = part.match(regex);
    if (match) {
      const key = match[1].trim();
      // return <Fragment key={index}>{replacements[key] || part}</Fragment>; // Replace or fallback to the original part.

      return createElement(Fragment, { children: replacements[key] || part, key: index })
    }
    // return <Fragment key={index}>{part}</Fragment>; // Non-placeholder text remains unchanged.
    return createElement(Fragment, { children: part, key: index })
  });

  // return <>{elements}</>;
  return createElement(Fragment, { children: elements })
}
