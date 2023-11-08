<template>
  <div class="header">
    <div class="am-g">
      <h1><strong>Sooyan</strong> <small>授权管理系统</small></h1>

    </div>
    <hr />
  </div>
  <div class="am-g">
    <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
      <h3 style="text-align: center; height: 30px;"></h3>

      <form action="/license/login" method="post" class="am-form">
        <label for="email">用户名:</label>
        <input type="text" name="name" id="email" value="">
        <br>
        <label for="password">密码:</label>
        <input type="password" name="password" id="password" value="">
        <br>
        <label for="remember-me">

        </label>
        <br />
        <div class="am-cf">
          <input type="submit" name="" value="登 录" class="am-btn am-btn-primary am-btn-sm am-fl"
            style="margin-left: 50%;">
        </div>
      </form>
      <hr>
      <p>© 2023 上海索验智能科技有限公司</p>
    </div>
  </div>
</template>
  
<script lang="ts">

</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

.header {
  text-align: center;
}

.header h1 {
  font-size: 200%;
  color: #333;
  margin-top: 30px;
}

.header p {
  font-size: 14px;
}</style>