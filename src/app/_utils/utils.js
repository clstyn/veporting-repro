export const formatDate = (inputTimestamp) => {
  const date = new Date(inputTimestamp);
  const monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = date.getDate();
  const month = monthName[date.getMonth()];
  const year = date.getFullYear();

  const formattedTime = `${day} ${month} ${year}`;
  return formattedTime;
};
