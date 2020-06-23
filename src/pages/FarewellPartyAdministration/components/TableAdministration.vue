<template>
  <div>
    <el-row>
      <el-col :span="1" :offset="23">
        <el-button type="primary" @click="fnNewlyBuildFrom()">新建</el-button>
      </el-col>
    </el-row>

    <el-table :data="dataFindAllAppointments.data" class="TableAdministration" style="width: 100%">
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status | statusSwitch}}</template>
      </el-table-column>
      <el-table-column prop="deadMan.name" label="逝者姓名"></el-table-column>
      <el-table-column label="二维码">
        <template slot-scope="scope">
          <img src="@/assets/images/Koala.jpg" alt="二维码" />
          <el-button type="text" :disabled="scope.row.status==0">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="fh.name" label="告别厅"></el-table-column>
      <el-table-column prop="useDate" label="使用日期"></el-table-column>
      <el-table-column label="使用时间">
        <template slot-scope="scope">{{scope.row.startTime}}-{{scope.row.endTime}}</template>
      </el-table-column>
      <el-table-column prop="undertaker.name" label="承办人姓名"></el-table-column>
      <el-table-column prop="undertaker.tel" label="承办人手机号"></el-table-column>
      <el-table-column prop="operator.name" label="操作者"></el-table-column>
      <el-table-column prop="reviewer.name" label="审核者" width="500px">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            :disabled="(scope.row.status!=0 || scope.row.status!=1)"
            type="text"
            size="small"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="(scope.row.status!=0 || scope.row.status!=1)"
          >逝者资料</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="(scope.row.status!=0 || scope.row.status!=1)"
          >模板设置</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="(scope.row.status!=0 || scope.row.status!=1)"
          >相册管理</el-button>
          <el-button
            @click="submitUpdAMStatus(scope.row)"
            type="text"
            size="small"
            :disabled="(scope.row.status!=2 || scope.row.status!=3)"
          >审核管理</el-button>
          <el-button
            @click="submitUpdAMStatus(scope.row)"
            type="text"
            size="small"
            :disabled="scope.row.status!=0"
          >确定预约</el-button>
          <el-button
            @click="deleteClick(scope.row)"
            class="deleteBtn"
            type="text"
            size="small"
            :disabled="scope.row.status!=0"
          >删除</el-button>
          <el-button
            @click="submitUpdAMStatus(scope.row)"
            type="text"
            size="small"
            :disabled="scope.row.status!=1"
          >仪式完成</el-button>
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

    <!-- 新建或修改预约 -->
    <NewlyBuildFrom />
  </div>
</template>

<script>
import mixin from "./Mixins";
import {
  _delAppointment,
  _updAMStatus
} from "@/api/FarewellPartyAdministration";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      customId: ""
    };
  },

  computed: {
    dataFindAllAppointments() {
      return this.FarewellPartyAdministration.TableCustomInfoManagement;
    },
    formInline() {
      return this.FarewellPartyAdministration.TableAdministration;
    },
    numTotle() {
      try {
        return this.FarewellPartyAdministration.TableCustomInfoManagement
          .pageInfo.total;
      } catch (error) {
        return 0;
      }
    }
  },

  filters: {
    statusSwitch(vla) {
      // 告别会状态：0-新建、1-已预约、2-待审核、3-审核中、4-已审核
      switch (vla) {
        case 0:
          return "新建";
          break;
        case 1:
          return "已预约";
          break;
        case 2:
          return "待审核";
          break;
        case 3:
          return "审核中";
          break;
        case 4:
          return "已审核";
          break;

        default:
          return "";
          break;
      }
    }
  },

  methods: {
    handleSizeChange(val) {
      this.SETOPTIONS({
        tableFromPageInfo: {
          page: 1,
          size: val
        }
      });
      this.getFindAllFHs();
    },

    handleCurrentChange(val) {
      this.SETOPTIONS({
        tableFromPageInfo: {
          page: val,
          size: 10
        }
      });
      this.getFindAllFHs();
    },

    deleteClick(row) {
      this.customId = row.id;
      this.$confirm("信息删除后将无法恢复确定要删除该信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.submitDialog();
        })
        .catch(() => {});
    },

    async submitDialog() {
      let [err, res] = await catchErr(
        _delAppointment({
          data: this.customId
        })
      );
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.$message.success("操作成功");
        this.getFindAllFHs();
      }
    },

    async submitUpdAMStatus(row) {
      // 预约状态：1-确定预约、2-仪式完成、3-审核管理
      let [err, res] = await catchErr(
        _updAMStatus({
          data: {
            amId: row.id,
            status: row.status + 1
          }
        })
      );
      if (err) {
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        this.$message.success("操作成功");
        this.getFindAllFHs();
      }
    },

    // 新建或修改预约
    fnNewlyBuildFrom() {
      this.SETOPTIONS({ NewFromDialogVisible: true });
    }
  }
};
</script>

<style lang="stylus">
.TableAdministration {
  .deleteBtn:not(.is-disabled) {
    color: #FC2121;
  }
}
</style>



