import {formatDistance} from 'date-fns'

function dateTimetoRelativeTime(datetime){
    let postTime = new Date(datetime)
    let currentTime = new Date();
    return formatDistance(postTime, currentTime, {addSuffix: true})
}

export default dateTimetoRelativeTime