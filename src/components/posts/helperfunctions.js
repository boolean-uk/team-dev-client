import { differenceInHours, differenceInDays } from 'date-fns'

function dateTimetoRelativeTime(datetime){
    let postTime = new Date(datetime)
    let currentTime = new Date;
    const hoursago = differenceInHours(currentTime,postTime)
    const daysago = differenceInDays(currentTime,postTime)
    if (daysago == 0)
    {
        if (hoursago == 0) return 'recent'
        else {
            
            if (hoursago == 1) return `1 hour ago`
            else return `${hoursago} hours ago`
        }
    }
    
    if (daysago == 1) return `1 day ago`
    else return `${differenceInDays(currentTime,postTime)} days ago`
}

export default dateTimetoRelativeTime