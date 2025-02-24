<script setup>
import {onBeforeMount, ref} from 'vue'
import {page, startOrStop, addNewEmployee, update} from "@/api/employees.js";
import Empty from "@/components/Empty.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const tableData = ref([])//列表所需数组
const isSearch = ref(false)
const counts = ref(0)//底部显示的共多少条
const currentPage = ref(1)//目前第几页
const pageSize = ref(10)//分页查询的大小
const id = ref("")//某条数据的ID
const status = ref(1)//某条数据的状态
const dialogVisible = ref(false)//弹窗的显示状态
const ruleFormRef = ref()//指向表单的引用
const addOrEdit = ref(0)//0为新增，1为修改
/**
 * 分页查询函数
 * @param v_name
 * @param v_page
 * @param v_pageSize
 * @returns {Promise<void>}
 */
const pageQueryHandle = async (v_name, v_page, v_pageSize) => {
  const res = await page(v_name, v_page, v_pageSize)
  console.log(res)
  tableData.value =  res.data.records
  counts.value = tableData.value.length
}
/**
 * 刷新数据
 * @returns {Promise<void>}
 */
const freshPage = async () => {
  await pageQueryHandle("", currentPage.value, pageSize.value)
  console.log(tableData)
}
/**
 * 更改分页查询页面大小
 * @param val
 * @returns {Promise<void>}
 */
const handleSizeChange = async (val) => {
  pageSize.value = val
  await pageQueryHandle("", currentPage.value, pageSize.value)
}
/**
 * 改变当前页
 * @param val
 * @returns {Promise<void>}
 */
const handleCurrentChange = async (val) => {
  currentPage.value = val
  await pageQueryHandle("", currentPage.value, pageSize.value)
}
/**
 * 改变账号状态处理函数
 * @param row
 */
const statusHandle = (row) => {
  if (row.username === 'admin') {
    return
  }
  id.value = row.id
  console.log(row)
  status.value = row.status
  console.log("即将调整状态")
  ElMessageBox.confirm(
      '确认调整该账号的状态?',
      '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    startOrStop(id.value,status.value === 1 ? 0:1 )
        .then(async (res) => {
          console.log(res)
          if (String(res.code) === '1') {
            ElMessage({
              type: 'success',
              message: '账号状态更改成功！',
            })
          }else {
            ElMessage({
              type: 'error',
              message: '账号状态更改失败',
            })
          }
          await pageQueryHandle("", currentPage.value, pageSize.value)
        })
        .catch((err) => {
          ElMessage({
            type: 'info',
            message: '请求出错了：'+err.message,
          })
        })
  }).catch(()=>{
    console.log('未知异常')
  })
  console.log("调整完成")
}

// 表单数据
const form = ref({
  id:'',
  username: '',
  name: '',
  phone: '',
  sex: '',
  idNumber: ''
});
// 表单验证规则
const rules = ref({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 24, message: '账号长度必须在3到24个字符之间', trigger: 'blur' },
    { pattern: /^[A-Za-z0-9_-]+$/, message: '账号只能包含字母、数字、下划线和-', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
    { min: 1, max: 20, message: '员工姓名长度必须在1到20个字符之间', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5A-Za-z0-9]+$/, message: '员工姓名只能包含汉字、字母和数字', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  idNumber: [
    { pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/, message: '身份证号码不正确', trigger: 'blur' }
  ]
});
/**
 * 提交表单
 */
const submitForm = async (formEl)=>{
  await formEl.validate((valid, fields) => {
    if (valid) {
      if(addOrEdit.value === 0){
        //执行新增
        addNewEmployee(form.value)
            .then(async (res) => {
              console.log(res)
              if (String(res.code) === '1') {
                ElMessage({
                  type: 'success',
                  message: '新增员工成功！',
                })
              }else {
                ElMessage({
                  type: 'error',
                  message: '新增员工失败！'
                })
              }
              await pageQueryHandle("", currentPage.value, pageSize.value)
            }).catch((err) => {
          ElMessage({
            type: 'warning',
            message: '请求出错了：'+err.message,
          })
        })
        dialogVisible.value = false
      }else if(addOrEdit.value === 1){
        //执行修改
        update(form.value)
            .then(async (res) => {
              console.log(res)
              if (String(res.code) === '1') {
                ElMessage({
                  type: 'success',
                  message: '修改员工成功！',
                })
              }else {
                ElMessage({
                  type: 'error',
                  message: '修改员工失败！'
                })
              }
              await pageQueryHandle("", currentPage.value, pageSize.value)
            }).catch((err) => {
          ElMessage({
            type: 'warning',
            message: '请求出错了：'+err.message,
          })
        })
        dialogVisible.value = false
      }

    } else {
      console.log(fields)
      ElMessage({
        type: 'error',
        message: '表单格式错误',
      })
    }
  })
}
const openAddEmpDialog = ()=>{
  addOrEdit.value = 0
  dialogVisible.value = true
}
const openEditEmpDialog = (row)=>{
  //数据回显
  form.value = {
    id:row.id,
    username: row.username,
    name: row.name,
    phone: row.phone,
    sex: row.sex,
    idNumber: row.idNumber
  }
  addOrEdit.value = 1
  dialogVisible.value = true
}
/**
 * 重置表单
 * @param formEl
 */
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

onBeforeMount(async () => {
  console.log(`the component is now mounted.`)
  await pageQueryHandle("", currentPage.value, pageSize.value)
  console.log("数据：")
  console.log(tableData.value)
})

</script>

<template>
  <div class="dashboard-container">
    <div class="tableBar">
      <label class="nameLable">员工姓名：</label>
      <el-input
          v-model="input"
          placeholder="请输入员工姓名"
          style="width: 15%;min-width: 160px"
          clearable
          @clear="init"
      />
      <el-button class="normal-btn continue" @click="freshPage">查询</el-button>
      <el-button class="normal-btn continue" @click="freshPage">刷新</el-button>
      <el-button
          type="primary"
          style="float: right"
          @click="openAddEmpDialog">
        + 添加员工
      </el-button>
    </div>

    <el-divider style="margin: 8px"/>

    <div class="container">
        <el-table
            :data="tableData"
            stripe
            v-if="tableData.length > 0"
            class="tableBox">
          <el-table-column prop="name" label="员工姓名"/>
          <el-table-column prop="username" label="账号"/>
          <el-table-column prop="phone" label="手机号"/>
          <el-table-column label="账号状态">
            <template v-slot="scope">
              <div
                  class="tableColumn-status"
                  :class="{ 'stop-use': String(scope.row.status) === 0 }"
              >
                {{ String(scope.row.status) === '0' ? '禁用' : '启用' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最后操作时间"/>
          <el-table-column label="操作" width="160" align="center">
            <template v-slot="scope">
              <el-button
                  type="text"
                  size="small"
                  class="blueBug"
                  :class="{ 'disabled-text': scope.row.username === 'admin' }"
                  :disabled="scope.row.username === 'admin'"
                  @click="openEditEmpDialog(scope.row)">
                修改
              </el-button>
              <el-button
                  :disabled="scope.row.username === 'admin'"
                  type="text"
                  size="small"
                  class="non"
                  :class="{
                'disabled-text': scope.row.username === 'admin',
                blueBug: scope.row.status === '0',
                delBut: scope.row.status !== '0',
              }"
                  @click="statusHandle(scope.row)">
                {{ scope.row.status === 1 ? '禁用' : '启用' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Empty v-else :is-search="isSearch"/>
    </div>

    <el-divider style="margin: 8px"/>

    <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        size="small"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="flex-wrap: wrap;row-gap: 8px"
    />
  </div>

  <el-dialog v-model="dialogVisible" title="添加员工" @close="resetForm">
    <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="100px">
      <!-- 账号 -->
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 员工姓名 -->
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="2">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 身份证号 -->
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="form.idNumber" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.disabled-text {
  color: #bac0cd !important;
}

.dashboard-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: end;
  height: auto;
  width: 100%;

  .tableBar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content:end;
    row-gap: 8px;

    .nameLable {
      margin-right: 8px
    }

    .normal-btn {
      margin-left: 8px
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
    width: 100%;
    .tableBox{
      width: 100%;
    }
  }
  .pageList {
    justify-content: center;
  }
}
</style>