const parsePeriodToDates = (period: string) => {
  if(period === "") return { dataInicio: new Date(), dataFim: new Date() };
  const [startDateStr, endDateStr] = period.split(" - ");
  const startDate = parseDate(startDateStr);
  const endDate = parseDate(endDateStr);

  return { dataInicio: startDate, dataFim: endDate };
};

const parseDate = (dateStr: string) => {
  if(!!!dateStr) return new Date();
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // Mês é base 0 (janeiro é 0)
};

export default parsePeriodToDates;