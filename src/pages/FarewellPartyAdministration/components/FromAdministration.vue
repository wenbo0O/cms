<template>
  <div class="template-form-administration">
    <el-form ref="tableFromData" :model="tableFromData" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="告别厅：">
            <el-select v-model="tableFromData.fhId" placeholder="请选择告别厅">
              <el-option
                v-for="(item, index) in arrFhId"
                :label="item.name"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="使用日期：">
            <el-date-picker
              v-model="tableFromData.useDate"
              align="right"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态：">
            <el-select v-model="tableFromData.status" placeholder="请选择">
              <el-option
                v-for="(item, index) in arrOptions"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      {{FarewellPartyAdministration}}
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="逝者姓名：">
            <el-input v-model="tableFromData.deadName" placeholder="请输入逝者姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="承办人姓名：">
            <el-input v-model="tableFromData.takerName" placeholder="请输入承办人姓名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="承办人手机号：">
            <el-input v-model="tableFromData.takerTel" placeholder="请输入承办人手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-button type="primary" @click="getData()">查询</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import mixin from "./Mixins";
import { statusOptions, statusOptions2 } from "../Enums";

export default {
  mixins: [mixin],
  data() {
    return {};
  },

  computed: {
    arrFhId() {
      return this.FarewellPartyAdministration.arrFhId;
    },
    tableFromData() {
      return this.FarewellPartyAdministration.tableFromData;
    },
    arrOptions() {
      // 判断当前账号权限
      // 操作者
      if (true) return statusOptions;
      // 审核者
      return statusOptions2;
    }
  },

  methods: {
    getData() {
      this.SETOPTIONS({
        tableFromData: this.tableFromData
      });
      this.getFindAllFHs();
    }
  },

  created() {
    // 获取告别厅菜单
    this.findAllFHs();
    this.getData();
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.template-form-administration {
}
</style>



