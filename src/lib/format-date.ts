/*
 * One date format for the whole product, and no locale data in the render path.
 *
 * `Intl.DateTimeFormat` and `toLocaleDateString` look safe here but are not.
 * The server formats with Node's ICU and the browser formats with its own, and
 * the two disagree on the en-GB short name for September: CLDR (Node, Chrome,
 * Firefox, Edge) says "Sept", while Apple's ICU — the one inside Safari and
 * every WebKit browser — says "Sep". The server HTML and the hydrated tree
 * then carry different text, and React throws "Hydration failed because the
 * server rendered text didn't match the client" on any September date. Chromium
 * hid it, because Chromium and Node happen to agree.
 *
 * Formatting from a fixed table takes ICU out of the equation entirely: the
 * server and every browser print the same characters, forever, with no
 * dependency on the host's locale data.
 *
 * The engine dates everything as UTC midnight, so the calendar day is read
 * straight out of the ISO string: no Date, no timezone, no clock, no drift.
 */

/** en-GB short month names, as the current CLDR en-GB table renders them. */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

const YEAR = /^\d{4}$/;
const MONTH = /^\d{1,2}$/;
const DAY = /^\d{1,2}$/;

/**
 * "2026-09-27" -> "27 Sept 2026".
 *
 * Anything that is not a plain ISO calendar date is returned untouched, so a
 * malformed value can never render as "NaN" or as an empty month.
 */
export function formatPlanDate(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts;
  if (!YEAR.test(year) || !MONTH.test(month) || !DAY.test(day)) return iso;

  const monthIndex = Number(month) - 1;
  const dayNumber = Number(day);
  if (monthIndex < 0 || monthIndex > 11) return iso;
  if (dayNumber < 1 || dayNumber > 31) return iso;

  return `${dayNumber} ${MONTHS[monthIndex]} ${year}`;
}
