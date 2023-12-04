<template>
    <div>
      <h1>在线视频列表</h1>
      <ul>
        <li v-for="(video, index) in videoList" :key="index" @click="playVideo(video)">
          {{ video.name }}
        </li>
      </ul>
      
      <div v-if="currentVideo">
        <h2>正在播放：{{ currentVideo.name }}</h2>
        <video controls :src="currentVideo.url" style="width: 100%; height: auto;"></video>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        videoList: [
          { name: 'Video 1', url: 'http://localhost:3000/DownloadAndUpload/faultImage/videos/video1.mp4' },
          // 添加更多视频
        ],
        currentVideo: null,
      };
    },
    methods: {
      playVideo(video) {
        this.currentVideo = video;
      },
    },
  };
  </script>
  
  <style>
  /* 样式可以根据需要自行添加 */
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  video {
    max-width: 100%;
    height: auto;
  }
  </style>
  