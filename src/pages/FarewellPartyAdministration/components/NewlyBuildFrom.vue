<template>
  <el-dialog
    title="新建"
    :visible.sync="FarewellPartyAdministration.NewFromDialogVisible"
    width="32%"
    :show-close="false"
  >
    {{NewFromData}}
    <el-form ref="NewFromData" :model="NewFromData" label-width="150px">
      <el-form-item label="逝者姓名：">
        <el-input v-model="NewFromData.deadName"></el-input>
      </el-form-item>

      <el-form-item label="逝者性别：">
        <el-select v-model="NewFromData.deadGender" placeholder="请选择逝者性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="逝者生日:">
        <el-date-picker
          v-model="NewFromData.deadBirthday"
          align="right"
          type="date"
          placeholder="选择逝者生日"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="逝者忌日:">
        <el-date-picker
          v-model="NewFromData.deadDeadday"
          align="right"
          type="date"
          placeholder="选择逝者忌日"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="告别厅：">
        <el-select v-model="NewFromData.fhId" placeholder="请选择">
          <el-option
            v-for="(item, index) in arrFhId"
            :label="item.name"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="告别厅使用时间：">
        <el-date-picker
          v-model="NewFromData.useDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="承办人姓名：">
        <el-input v-model="NewFromData.takerName"></el-input>
      </el-form-item>

      <el-form-item label="承办人手机号：">
        <el-input v-model="NewFromData.takerTel"></el-input>
      </el-form-item>

      <el-form-item label="承办人性别">
        <el-select v-model="NewFromData.takerGender" placeholder="请选择承办人性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="与逝者关系：">
        <el-checkbox-group v-model="NewFromData.relationId">
          <el-checkbox label="长辈" name="type"></el-checkbox>
          <el-checkbox label="平辈" name="type"></el-checkbox>
          <el-checkbox label="晚辈" name="type"></el-checkbox>
        </el-checkbox-group>
        <span>（注：逝者是承办人的长辈、平辈或晚辈）</span>
      </el-form-item>

      <el-form-item label="对逝者称呼:">
        <el-select v-model="NewFromData.region" placeholder="请选择承办人性别">
          <el-option label="称呼1" value="1"></el-option>
          <el-option label="称呼2" value="2"></el-option>
        </el-select>
        <span>（注：承办人对逝者的称呼）</span>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitDialog" type="primary">确 定</el-button>
        <el-button @click="cancelDialog">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import mixin from "./Mixins";
import { _editAppointment } from "@/api/FarewellPartyAdministration";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {};
  },

  computed: {
    arrFhId() {
      return this.FarewellPartyAdministration.arrFhId;
    },
    NewFromData() {
      return this.FarewellPartyAdministration.NewFromData;
    },
    resetNewFromData() {
      return this.FarewellPartyAdministration.resetNewFromData;
    }
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },

    async submitDialog() {
      let [err, res] = await catchErr(
        _editAppointment({
          data: this.NewFromData
        })
      );
      if (err) {
        this.$message.error(err.statusText || "错了哦，系统异常");
      } else if (res) {
        console.log(res);
        this.$message.success("操作成功");
        this.SETOPTIONS({
          NewFromDialogVisible: false,
          NewFromData: this.resetNewFromData
        });
      }
    },

    cancelDialog() {
      this.SETOPTIONS({
        NewFromDialogVisible: false,
        NewFromData: this.resetNewFromData
      });
    }
  }
};
</script>

<style lang="stylus"></style>