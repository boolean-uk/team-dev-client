import client from "../../../utils/client";

const secOneMin = 60;
const secOneHour = secOneMin * 60;
const secOneDay = secOneHour * 24;

function formatTime(timeString) {
  const time = new Date(timeString);
  const now = new Date();
  const diff = (now - time) / 1000;
  const timeArr = time.toUTCString().split(" ");
  let formatted;

  if (time.getFullYear < now.getFullYear()) {
    formatted = timeArr.slice(0, 3).join(" ");
  } else if (diff > secOneDay) {
    formatted = timeArr.slice(0, 2).join(" ");
  } else if (diff > secOneHour) {
    const hoursPassed = Math.floor(diff / secOneHour);
    formatted = hoursPassed + " hours ago";
  } else if (diff > secOneMin) {
    const minutesPassed = Math.floor(diff / secOneMin);
    formatted = minutesPassed + " minutes ago";
  }

  return formatted;
}

export async function getAllPostsFormatted() {
  await client.get("/posts").then((res) => {
    const posts = res.data.data.posts;
    const formattedPosts = posts.map(
      (post) => (post.createdAt = formatTime(post.createdAt))
    );
    return formattedPosts;
  });
}

// console.log(formatTime("2021-09-10T16:22:13.554Z"));
// console.log(formatTime("2022-09-11T19:22:13.554Z"));
// console.log(formatTime("2022-09-13T15:22:13.554Z"));
// console.log(formatTime("2022-09-14T08:22:13.554Z"));
