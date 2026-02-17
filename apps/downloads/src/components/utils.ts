export function cx(...c: Array<string | false | undefined>) {
  return c.filter(Boolean).join(" ");
}
