<template>
  <el-dialog
    :fullscreen="true"
    custom-class="lookCustomInfoManagement"
    :visible.sync="previewDialogVisible"
    :destroy-on-close="true"
  >
    <div>
      <h1>{{dataInfo.name}}</h1>
      <p>{{customId}}{{dataInfo.content}}</p>
      <img class="pic" src="@/assets/images/Koala.jpg" />
    </div>
  </el-dialog>
</template>

<script>
import mixin from "../Mixins";
import { _findCustomById } from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      dataInfo: {}
    };
  },

  computed: {
    customId() {
      return this.UnitManagement.customId;
    },

    previewDialogVisible: {
      get() {
        return this.UnitManagement.previewDialogVisible;
      },
      set(val) {
        this.SETOPTIONS({
          previewDialogVisible: val
        });
      }
    }
  },

  methods: {
    async findCustomById() {
      let [err, res] = await catchErr(
        _findCustomById({
          data: this.customId
        })
      );
      if (err) {
        console.log(err);
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        let { name, content } = res.data;
        this.dataInfo = {
          name,
          content
        };
      }
    }
  },

  watch: {
    customId(newVal) {
      if (newVal) this.findCustomById();
    },

    previewDialogVisible(newVal) {
      if (!newVal)
        this.SETOPTIONS({
          dataInfo: {},
          customId: ""
        });
    }
  }
};
</script>

<style lang="stylus">
.lookCustomInfoManagement {
  background: transparent;
  display: flex;
  align-items: center;

  .el-dialog__header {
    padding: 0;

    .el-dialog__headerbtn {
      right: 30px;
      top: 150px;
      width: 40px;
      height: 40px;
      font-size: 40px;

      .el-dialog__close {
        color: #000;
      }
    }
  }

  .el-dialog__body {
    background: url('~@/assets/images/UnitManagement/LookCustomInfoManagementBG.png');
    background-size: 100% 100%;
    padding: 0;
    width: 490px;
    height: 870px;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>

<style lang="stylus" scoped>
h1 {
  width: 235px;
  height: 52px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 216, 111, 1);
  line-height: 52px;
  margin: 54px auto 20px;
  text-align: center;
}

p {
  width: 378px;
  height: 287px;
  padding: 14px 13px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 216, 111, 1);
  line-height: 20px;
  margin: 0 auto;
}

.pic {
  display: block;
  width: 378px;
  height: 287px;
  margin: 25px auto 0;
}
</style>