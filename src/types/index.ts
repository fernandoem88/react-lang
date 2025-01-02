
import type { JSX } from "react";

/**
 * @description return keywords from the given string
 * @param Text the text to retrive keys from
 * @param Open the opening tag
 * @param Close the closing tag
 * @example
 * type Keywords = GetStringKeywords<"you must drink {{type}} after {{time}}">
 * // the returned keys will be
 * type Keywords = "type" | "time"
 *
 * @example
 * // this following example uses `/:` as opening tag and `/` as closing tag
 * type Keywords = GetStringKeywords<"restaurants/:restaurantId/table/:tableId/", "/:", "/">
 * // will return
 * type Keywords = "restaurantId" | "tableId"
 */
// prettier-ignore
type GetStringKeywords<
  Text extends string,
  Open extends string = "{{",
  Close extends string = "}}",
  EndOfLine extends string = ""
> = Concat<Text, EndOfLine> extends `${infer Sub1}${Open}${infer Keyword}${Close}${infer Sub2}`
  ? Keyword | GetStringKeywords<Sub1, Open, Close, EndOfLine> | GetStringKeywords<Sub2, Open, Close, EndOfLine>
  : never;

type Concat<T1 extends string, T2 extends string> =
  T2 extends "" ? T1 : `${T1}${T2}`;




// prettier-ignore
export type GetStringReplacerArgs<
  T extends string,
  Start extends string,
  End extends string,
  EndOfLine extends string
> = GetStringKeywords<T, Start, End, EndOfLine> extends never
  ? []
  : [
    keys: Record<
      GetStringKeywords<T, Start, End, EndOfLine>,
      string | number | JSX.Element
    >
  ];

export default {} as const

