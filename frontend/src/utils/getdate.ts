export const getDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString();

  // Array of month abbreviations
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthAbbreviation = monthAbbreviations[monthIndex];

  const formattedDate = `${day} ${monthAbbreviation} ${year}`;
  return formattedDate;
};
