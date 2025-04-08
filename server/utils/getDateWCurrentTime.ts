export const currentDate = () => {
  const today = new Date();
  const stringTodayDate = Intl.DateTimeFormat("he-IL").format(today).toString();
  const finalDate = stringTodayDate.replaceAll("/", "-");
  const time = today.toLocaleTimeString("he-IL").replace(/[:\s]/g, "-");
  return { date: finalDate, time };
};
