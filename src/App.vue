<script setup>
import { useLoadingStore } from '@/stores/loading'

const store = useLoadingStore()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="title"><a href="/">Steve说</a></div>
      <div class="title-desc">——心理学播客</div>
    </div>
  </header>
  <main class="main">
    <a-spin tip="Loading..." :spinning="store.isLoading">
      <div class="content">
        <a-back-top />
        <router-view />
      </div>
    </a-spin>
  </main>

  <footer class="footer">
    <a-divider />
    <div>@{{ new Date().getFullYear() }} <a href="http://steveshuo.com/">Steve说 - 官网</a></div>
    <div>Powered by Vue3 + Vite + Ant Design Vue</div>
  </footer>
</template>

<style lang="scss" scoped>
$min-width: 1000px;

.header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #fff;

  .container {
    height: 100%;

    margin: 0 auto;
    padding: 0 10px;
    border-bottom: 1px solid #dcdfe6;

    display: flex;
    justify-content: center;

    @media (min-width: $min-width) {
      width: 1140px;
    }

    .title {
      font-size: 2rem;
      font-weight: 500;
    }

    .title-desc {
      display: inline;
      color: rgba(0, 0, 0, 0.45);
      margin-left: 10px;
      padding-top: 10px;
      font-size: 14px;
    }
  }
}

.main {
  position: relative;

  height: calc(100% - 80px);
  margin: 0 auto;
  padding: 10px 0;
  top: 80px;

  @media (min-width: $min-width) {
    width: 1140px;
  }
}

.footer {
  text-align: center;
  margin-top: 70px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
