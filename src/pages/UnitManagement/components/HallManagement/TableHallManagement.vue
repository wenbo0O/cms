<template>
  <div>
    <!-- 告别厅管理 -tab -->
    <el-row>
      <el-button type="primary" @click="editClick()">新建</el-button>
    </el-row>

    <el-row>
      <span>合计：{{numTotle}}个</span>
    </el-row>
    <el-table :data="dataFindAllFHs.data" style="width: 100%">
      <el-table-column prop="addTime" label="新建时间"></el-table-column>
      <el-table-column prop="name" label="告别厅名称"></el-table-column>
      <el-table-column prop="code" label="告别厅编码"></el-table-column>
      <el-table-column prop="amCount" label="告别会数量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="numTotle"
    ></el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <p>信息删除后不可恢复，确定要删除所选信息吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialog">确 定</el-button>
        <el-button @click="cancelDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "../Mixins";
import { _findAllFHs, _delFHById } from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      id: "",
      dialogVisible: false
    };
  },

  computed: {
    dataFindAllFHs() {
      return this.UnitManagement.TableHallManagement;
    },
    numTotle() {
      try {
        return this.UnitManagement.TableHallManagement.pageInfo.total;
      } catch (error) {
        return 0;
      }
    }
  },

  methods: {
    async getData(
      pageInfo = {
        page: 1,
        size: 10
      }
    ) {
      let [err, res] = await catchErr(_findAllFHs({ pageInfo }));
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.SETOPTIONS({ TableHallManagement: res });
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

    editClick(row) {
      let backInfo = row ? row : {};
      this.SETOPTIONS({
        indexHallManagement: 1,
        NewHallManagementFromData: backInfo
      });
    },

    deleteClick(row) {
      this.id = row.id;
      this.dialogVisible = true;
    },

    async submitDialog() {
      let [err, res] = await catchErr(
        _delFHById({
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
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus"></style>



