export interface Video {
    "kind": string,
    "etag": string,
    "id": {
      "kind": string,
      "videoId": string,
      "channelId": string,
      "playlistId": string
    },
    "items": [any[]],
    "snippet": {
      "publishedAt": string,
      "channelId": string,
      "title": string,
      "description": string,
      "thumbnails": {
        (key): {
          "url": string,
          "width": number,
          "height": number
        }
      },
      "channelTitle": string,
      "liveBroadcastContent": string
    }
}