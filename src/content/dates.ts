const TIME_ZONE = "Europe/Madrid";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

/** Offset of Madrid from UTC, in ms, at the given instant. */
function offsetAt(instant: number): number {
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date(instant)).map((part) => [part.type, Number(part.value)]),
  );
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUtc - Math.floor(instant / 1000) * 1000;
}

/** Instant at which the given calendar day starts in Madrid. */
function madridMidnight(year: number, month: number, day: number): number {
  const guess = Date.UTC(year, month - 1, day);
  const first = guess - offsetAt(guess);
  return guess - offsetAt(first);
}

/**
 * Converts a config date to an instant (ms since epoch).
 * - `YYYY-MM-DD` means Madrid calendar time; `edge: "start"` is that day's first
 *   instant and `edge: "end"` is the first instant of the next day, so an
 *   `until` date stays inclusive for the whole day.
 * - A full ISO datetime with offset is used as is.
 */
export function toInstant(value: string, edge: "start" | "end"): number {
  const date = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!date) return Date.parse(value);

  const [, year, month, day] = date.map(Number);
  return edge === "start"
    ? madridMidnight(year, month, day)
    : madridMidnight(year, month, day + 1);
}
