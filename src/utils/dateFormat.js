const extractDate = str => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(str);
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${month} ${year}`;
};

export default extractDate;
