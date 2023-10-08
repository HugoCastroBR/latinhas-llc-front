const convertDatesToPeriod = ({
  dataInicio,
  dataFim,
}: {
  dataInicio: Date;
  dataFim: Date;
}) => {
  const dataI = formatDate(dataInicio);
  const dataF = formatDate(dataFim);
  return `${dataI} - ${dataF}`;
};

const formatDate = (date: Date) => {
  const dateOut = new Date(date);
  const day = String(dateOut.getDate()).padStart(2, '0');
  const month = String(dateOut.getMonth() + 1).padStart(2, '0');
  const year = dateOut.getFullYear();
  return `${day}/${month}/${year}`;
};

export default convertDatesToPeriod;