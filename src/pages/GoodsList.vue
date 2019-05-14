<template>
  <div>
    <el-row class="dd" type="flex" algin="middle" justify="space-between">
      <el-col>
        <el-button @click="goodsadd_tiaozhuan">新增</el-button>
        <el-button @click="handmoredelete">删除</el-button>
      </el-col>
      <div>
        <el-input v-model="searchvalue" placeholder="请输入内容" class="input-with-select inp">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="350">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goodslist_img">
            <p>{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180" prop="categoryname"></el-table-column>
      <el-table-column label="价格" width="180" prop="market_price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.pageIndex"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.totalcount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ids: [],
      data: {},
      searchvalue: ''
    };
  },
  methods: {
    //跳转到添加商品页面
    goodsadd_tiaozhuan: function() {
      this.$router.replace('/admin/goods-add');
    },
    //获取数据
    getlistdata: function() {
      const pageIndex = this.data.val || 1;
      const pageSize = this.data.pageSize || 4;
      this.$axios({
        url: `/admin/goods/getlist?pageIndex=${pageIndex}&pageSize=${pageSize}&searchvalue=${this.searchvalue}`,
        method: "get"
      }).then(res => {
        console.log(11);
        console.log(res);
        const { data } = res;
        this.tableData = data.message;
        this.data = data;
      });
    },
    //搜索
    handleSearch: function() {
        this.getlistdata();
    },
    handleEdit(row) {
      console.log(123)
      console.log(row);
      this.$router.push(`/admin/goods-edit/${row.id}`);
    },
    handleSelectionChange(val) {
      // console.log(val)
      const ids = val.map(v => {
        return v.id;
      });
      this.ids = ids;
    },
    handmoredelete() {
      const id = this.ids.join(",");
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: `admin/goods/del/${id}`,
            // 处理跨域请求的参数
            withCredentials: true
          }).then(res => {
            //   console.log(res)
            const { status, message } = res.data;
            this.$message({
              type: "success",
              message
            });
            this.getlistdata();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除单行数据
    handleDelete(row) {
      const id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: `admin/goods/del/${id}`,
            // 处理跨域请求的参数
            withCredentials: true
          }).then(res => {
            // console.log(res)
            const { status, message } = res.data;
            this.$message({
              type: "success",
              message
            });
            this.getlistdata();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //翻页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.data.pageSize = val;
      this.getlistdata();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.data.val = val;
      this.getlistdata();
    }
  },
  mounted() {
    this.getlistdata();
  }
};
</script>

<style>
.dd {
  margin: 0 0 20px 0;
}
.inp {
  width: 300px;
}
.goodslist_img {
  width: 64px;
  margin-right: 10px;
}
.block {
  margin-top: 20px;
}
</style>
