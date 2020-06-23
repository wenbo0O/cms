<template>
  <div>
    <!-- 账号管理 tab-->
    <el-row>
      <el-button type="primary" @click="editClick()">新建</el-button>
    </el-row>

    <el-table :data="dataFindAllAdmins.data" style="width: 100%">
      <el-table-column prop="createTime" label="新建时间" width="180"></el-table-column>
      <el-table-column prop="name" label="登录账号" width="180"></el-table-column>
      <el-table-column prop="nick" label="使用者"></el-table-column>
      <el-table-column prop="tel" label="手机号码"></el-table-column>
      <el-table-column prop="role.name" label="角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.usable | formatStatus}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button
            @click="stopClick(scope.row)"
            type="text"
            size="small"
            :class="{btnColor: scope.row.usable, btnColor2: !scope.row.usable}"
          >{{scope.row.usable | formatStatus('btn')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="numTotle"
    ></el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <p v-if="unfinished == true">停用后该账号将无法登录，确定要停用该账号吗？</p>
      <p v-else>该账号尚有未完成工作，停用后将无法对未完成工作进行处理，确定要停用该账号吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialog">确 定</el-button>
        <el-button @click="cancelDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "../Mixins";
import {
  _getFindAllAdmins,
  _getCheckAdmin,
  _upDownAdmin
} from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      unfinished: Boolean,
      dialogVisible: false,
      id: 0
    };
  },

  computed: {
    dataFindAllAdmins() {
      return this.UnitManagement.TableAccountManagement;
    },
    numTotle() {
      try {
        return this.UnitManagement.TableAccountManagement.pageInfo.total;
      } catch (error) {
        return 0;
      }
    }
  },

  filters: {
    formatStatus(val, isbtn) {
      if (isbtn) return val ? "停用" : "启用";
      return val ? "已启用" : "已停用";
    }
  },

  methods: {
    async getData(
      pageInfo = {
        page: 1,
        size: 10
      }
    ) {
      let [err, res] = await catchErr(_getFindAllAdmins({ pageInfo }));
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.SETOPTIONS({ TableAccountManagement: res });
      }
    },

    handleSizeChange(val) {
      this.getData({
        page: 1,
        size: val
      });
    },

    handleCurrentChange(val) {
      this.getData({
        page: val,
        size: 10
      });
    },

    async stopClick(row) {
      this.id = row.id;
      if (row.usable) {
        let [err, res] = await catchErr(
          _getCheckAdmin({
            data: row.id
          })
        );
        if (err) {
          if (err.status == 1010) {
            this.unfinished = false;
            this.dialogVisible = true;
            return false;
          }
          this.$message.error(err || "错了哦，系统异常");
        } else if (res) {
          // 停用
          this.unfinished = true;
          this.dialogVisible = true;
        }
      } else {
        // 启用
        this.submitDialog();
      }
    },

    async submitDialog() {
      let [err, res] = await catchErr(
        _upDownAdmin({
          data: this.id
        })
      );
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        console.log(res);
      }
    },

    cancelDialog() {
      this.dialogVisible = false;
    },

    editClick(row) {
      let backInfo = row
        ? row
        : {
            role: {
              id: "",
              name: ""
            }
          };
      this.SETOPTIONS({
        indexAccountManagement: 1,
        NewAccountManagementFromData: backInfo
      });
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.btnColor {
  color: #FC2121;
}

.btnColor2 {
  color: #0ACD39;
}
</style>



