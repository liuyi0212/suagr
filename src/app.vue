<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

</script>

<style lang="less">
    html,
    body,
    #app {
        height: 100%;
    }

    body {
        background: #f5f5f5;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }
</style>
