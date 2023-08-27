import moment from "moment/moment";

export const DateTimeFormater = (date) => {

    return moment(date).format("DD-MM-YYYY HH:MM A")
}

export const DateFormater = (date) => {

    return moment(date).format("DD-MM-YYYY")
}

export const TimeDIfference = (inputDateTime) => {

    const currentDateTime = moment();
    const parsedInputDateTime = moment(inputDateTime, 'YYYY-MM-DD HH:mm');

    // Calculate the time difference in minutes
    const timeDiffMinutes = parsedInputDateTime.diff(currentDateTime, 'minutes');

    // Calculate the time difference in days, hours, and minutes
    const timeDiff = moment.duration(timeDiffMinutes, 'minutes');
    const daysDiff = timeDiff.days();
    const hoursDiff = timeDiff.hours();
    const minutesDiff = timeDiff.minutes();
    return (
        <div style={{ displa: 'flex', flexDirection: 'row' }}>
            <div>{`${Math.abs(daysDiff)} days Before`}</div>
            <div>{moment(inputDateTime).format("DD-MM-YYYY HH:MM A")}</div>
        </div>)
}