import moment from "moment/moment";

const MyDate = ({ date }) => {
  const handleDate = () => {
    let copy = new Date(Date.now());
    const prev = moment(new Date(copy.setDate(copy.getDate() - 1))).format("l");
    const today = moment(Date.now()).format("l");
    const current = moment(date).format("l");

    if (current === prev) return "Yesterday";
    if (current === today) return "Today";
    return moment(date).format("DD MMMM");
  };
  return (
    <div className="myDateBox">
      <div className="myDate">{handleDate()}</div>
    </div>
  );
};

export default MyDate;
