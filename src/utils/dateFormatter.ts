export const formatDateTime = (
  date: string | Date,
  local: string = "es-Mx",
): string => {
  if (!date) return "";

  let parsedDate: Date;

  if (typeof date === "string") {
    const cleanDate = date.includes("+") ? date.split("+")[0] : date;
    parsedDate = new Date(cleanDate);
  } else {
    parsedDate = date;
  }

  return new Intl.DateTimeFormat(local, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(parsedDate);
};
