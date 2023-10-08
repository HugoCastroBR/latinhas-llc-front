const calcWeek = (dataString: string): number => {
  if (dataString === "") return 0;
  const datas = dataString.split(" - ");
  const dataInicio = datas[0];
  const [diaInicio, mesInicio, anoInicio] = dataInicio.split("/").map(Number);
  const startDate = new Date(anoInicio, mesInicio - 1, diaInicio);

  const startOfYear = new Date(anoInicio, 0, 1);

  const differenceInMilliseconds = startDate.getTime() - startOfYear.getTime();

  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  const weekNumber = Math.ceil((differenceInDays + 1) / 7);

  return weekNumber;
};

export default calcWeek;