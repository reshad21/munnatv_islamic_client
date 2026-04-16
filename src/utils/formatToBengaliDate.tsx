import { format } from "date-fns";
import { bn } from "date-fns/locale";

export const formatToBengaliDate = (isoDate: string, showTime = true) => {
  const date = new Date(isoDate);

  // Select format based on showTime flag
  const formatPattern = showTime ? "dd MMMM, yyyy HH:mm" : "dd MMMM, yyyy";

  const formattedDate = format(date, formatPattern, { locale: bn });

  // Convert English numbers to Bengali numbers
  const englishToBengaliDigits = (str: string) =>
    str.replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[parseInt(digit, 10)]);

  return englishToBengaliDigits(formattedDate);
};
