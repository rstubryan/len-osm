export function ddToDms(dd: number): {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: string;
} {
  const degrees = Math.floor(Math.abs(dd));
  const minutes = Math.floor((Math.abs(dd) - degrees) * 60);
  const seconds = (Math.abs(dd) - degrees - minutes / 60) * 3600;
  const direction = dd >= 0 ? "N" : "S";
  return { degrees, minutes, seconds, direction };
}
