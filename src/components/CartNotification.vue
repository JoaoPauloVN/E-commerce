<template>
  <div class="notification">
      <h2>{{title}}</h2>
      <p>{{message}}</p>
      <div class="progress">
          <div class="progress-bar" :style="{width: progress + '%'}"></div>
      </div>
      <i class="fas fa-times" @click="close"></i>
  </div>
</template>

<script>
export default {
    name: 'CartNotification',
    methods: {
        close() {
            this.$emit('close')
        }
    },
    props: [
        'progress',
        'title',
        'message'
    ],
    computed: {
        TotalProgress() {
            this.progress + '%'
        }
    }
}
</script>

<style lang='scss' scoped>
    .notification {
        position: fixed;
        bottom: 20px;
        right: 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        background: rgb(18, 186, 18);
        min-width: 300px;
        max-width: 400px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 5px 15px 0 rgba(0,0,0,.6);
        transition: all 1s;
        &.desactive {
            right: -600px;
            .progress {
                background: linear-gradient(to right, transparent, white);
            }
        }
        h2 {
            width: 100%;
            color: white;
            font-size: 20px;
            letter-spacing: .8px;
        }
        p {
            color: white;
            font-size: 16px;
        }
        i {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            cursor: pointer;
            font-size: 16px;
        }
        .progress {
            position: absolute;
            bottom: 0;
            left: 2.5%;
            width: 95%;
            height: 3px;
            border-radius: inherit;
            background: transparent;
            .progress-bar {
                height: 100%;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.109), rgb(255, 255, 255));
                border-radius: inherit;
            }
        }
    }
</style>