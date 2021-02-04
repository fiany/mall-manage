<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单-->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409BFF"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router
                 :default-active="activePath">
          <!-- 一级菜单-->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域-->
            <template slot="title">
              <!-- 图标-->
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单-->
            <el-menu-item :index="subItem.path" v-for="subItem in item.child" :key="subItem.id"
                          @click="saveNavState(subItem.path)">
              <!-- 图标-->
              <i class="el-icon-menu"></i>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { userLogout } from '@/api/user'

export default {
  data() {
    return {
      // 菜单数据
      menuList: [{
        id: 125,
        name: '用户管理',
        child: [{
          id: 1251,
          name: '用户列表',
          path: '/user/list'
        }]
      },

      {
        id: 101,
        name: '商品模块',
        child: [{
          id: 1011,
          name: '商品管理',
          path: '/product/list'
        },
        {
          id: 1012,
          name: '分类列表',
          path: '/category/list'
        },
        {
          id: 1013,
          name: '品牌列表',
          path: '/brand/list'
        }]
      },
      {
        id: 102,
        name: '订单管理',
        child: [{
          id: 1021,
          name: '订单列表',
          path: '/order/list'
        }]
      },
      {
        id: 145, name: '报表管理'
      },
      {
        id: 103,
        name: '权限模块',
        child: [{
          id: 1032,
          name: '角色管理',
          path: '/role/manage'
        },
        {
          id: 1033,
          name: '权限管理',
          path: '/permission/manage'
        }]
      }
      ],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      userLogout().then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
      })
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menu')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    toggleCollapse() {
      // 点击隐藏菜单
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eeeeee;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fffdef;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
