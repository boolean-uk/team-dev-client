import client from '../../../utils/client';

const secOneMin = 60;
const secOneHour = secOneMin * 60;
const secOneDay = secOneHour * 24;

function formatTime(timeString) {
  const time = new Date(timeString);
  const now = new Date();
  const diff = (now - time) / 1000;
  const timeArr = time.toUTCString().split(' ');
  let formatted;

  if (time.getFullYear < now.getFullYear()) {
    formatted = timeArr.slice(0, 3).join(' ');
  } else if (diff >= secOneDay) {
    formatted = timeArr.slice(0, 2).join(' ');
  } else if (diff >= secOneHour) {
    const hoursPassed = Math.floor(diff / secOneHour);
    formatted = hoursPassed + ' hours ago';
  } else if (diff >= secOneMin) {
    const minutesPassed = Math.floor(diff / secOneMin);
    formatted = minutesPassed + ' minutes ago';
  } else if (diff < secOneMin) {
    formatted = 'less than one minutes ago';
  }

  return formatted;
}

export function renderPosts(setPosts) {
  client.get('/posts').then((res) => {
    const postsFetched = res.data.data;
    const formattedPosts = postsFetched.map((post) => {
      post.createdAt = formatTime(post.createdAt);
      return post;
    });
    setPosts(formattedPosts);
  });
}
