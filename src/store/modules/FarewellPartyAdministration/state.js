export default {
  TableCustomInfoManagement: {},
  indexCustomInfoManagement: 0,

  // 获取告别厅菜单
  arrFhId: [],

  // 告别会管理 - 全部预约信息列表
  tableFromData: {
    fhId: null,
    useDate: null,
    status: null,
    deadName: "",
    takerName: "",
    takerTel: ""
  },
  tableFromPageInfo: {
    page: 1,
    size: 10
  },

  // 新建或修改预约
  NewFromDialogVisible: false,
  resetNewFromData: {
    amId: "",
    deadName: "",
    deadGender: "",
    deadBirthday: "",
    deadDeadday: "",
    fhId: "",
    useDate: "",
    startTime: "",
    endTime: "",
    takerName: "",
    takerTel: "",
    takerGender: "",
    relationId: ""
  },
  NewFromData: {
    amId: "",
    deadName: "",
    deadGender: "",
    deadBirthday: "",
    deadDeadday: "",
    fhId: "",
    useDate: "",
    startTime: "",
    endTime: "",
    takerName: "",
    takerTel: "",
    takerGender: "",
    relationId: ""
  }

}
