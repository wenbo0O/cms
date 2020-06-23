<template>
  <div>
    <!-- 风俗信息管理 tab -->
    <el-row>
      <el-button type="primary" @click="editClick(null, 1)">新建</el-button>
    </el-row>

    <el-table :data="dataFindAllFHs.data">
      <el-table-column prop="createTime" label="新建时间"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="preview(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editClick(scope.row, 1)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="goUpClick(scope.row)" disabled type="text" size="small">上升</el-button>
          <el-button @click="goUpClick(scope.row)" disabled type="text" size="small">下降</el-button>
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
      <p>信息删除后将无法恢复确定要删除该信息吗？</p>
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
  _findAllCustoms,
  _delCustom,
  _editCustomNo
} from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      customId: "",
      dialogVisible: false
    };
  },

  computed: {
    dataFindAllFHs() {
      return this.UnitManagement.TableCustomInfoManagement;
    },
    numTotle() {
      try {
        return this.UnitManagement.TableCustomInfoManagement.pageInfo.total;
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
      let [err, res] = await catchErr(_findAllCustoms({ pageInfo }));
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.SETOPTIONS({ TableCustomInfoManagement: res });
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

    editClick(row, index) {
      this.customId = row ? row.id : null;
      this.SETOPTIONS({
        indexCustomInfoManagement: index,
        customId: this.customId
      });
    },

    preview(row) {
      this.SETOPTIONS({
        customId: row.id,
        previewDialogVisible: true
      });
    },

    deleteClick(row) {
      this.customId = row.id;
      this.dialogVisible = true;
    },

    async submitDialog() {
      let [err, res] = await catchErr(
        _delCustom({
          data: this.customId
        })
      );
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.$message.success("操作成功");
        this.dialogVisible = false;
      }
    },

    cancelDialog() {
      this.dialogVisible = false;
    },

    async goUpClick(row) {
      let { id, no } = row;
      let [err, res] = await catchErr(
        _editCustomNo({ data: { customId: id, no } })
      );
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.$message.success("操作成功");
      }
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus"></style>



