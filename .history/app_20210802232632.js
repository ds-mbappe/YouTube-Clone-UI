let api_key = "AIzaSyDHsb2XFQC_A5c3sgJTcE1WiZPR0dXluDA";

let video_http = "https://www.googleapis.com/youtube/v3/videos?";

let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'FR'
})).then(res => res.json()).then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
}).catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}