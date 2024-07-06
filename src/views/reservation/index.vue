<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-select v-model="listQuery.factoryId" placeholder="选择厂区" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in factoryIdOptions" :key="item.factoryId" :label="item.factoryName"
          :value="item.factoryId" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="预约状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in orderStatus" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button> -->
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
      @sort-change="sortChange">
      <!-- 预约单状态 -->
      <el-table-column label="预约单状态" prop="reservationStatusName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.reservationStatusName }}</span>
        </template>
      </el-table-column>

      <!-- 预约厂区 -->
      <el-table-column label="预约厂区" prop="factoryName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.factoryName }}</span>
        </template>
      </el-table-column>

      <!-- 预约时间 -->
      <el-table-column label="预约时间" prop="reservationTime" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{ row.appointmentStartTime }} ~ {{ row.appointmentEndTime }}</span>
        </template>
      </el-table-column>

      <!-- 来访事由 -->
      <el-table-column label="来访事由" prop="reservationEventName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.reservationEventName }}</span>
        </template>
      </el-table-column>

      <!-- 货物名称 -->
      <el-table-column label="货物名称" prop="goodsName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>

      <!-- 前往区域 -->
      <el-table-column label="前往区域" prop="dockName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.dockName }}</span>
        </template>
      </el-table-column>

      <!-- 供应商 -->
      <el-table-column label="供应商" prop="supplierName" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.supplierName }}</span>
        </template>
      </el-table-column>

      <!-- 车牌号 -->
      <el-table-column label="车牌号" prop="licensePlate" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.licensePlate }}</span>
        </template>
      </el-table-column>

      <!--
      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Imp" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    -->
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            详情
          </el-button>
          <el-button v-if="row.reservationStatus == 'QUEUEING'" size="mini" type="success" @click="inFactory(row)">
            进厂
          </el-button>
          <el-button v-if="row.reservationStatus == 'IN_FACTORY'" size="mini" @click="outFactory(row)">
            出厂
          </el-button>
          <!-- <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">

        <!--预约单ID-->
        <el-form-item label="预约单ID">
          <template>
            <span>{{ temp.reservationId }}</span>
          </template>
        </el-form-item>

        <!--预约单状态-->
        <el-form-item label="预约状态">
          <template>
            <span>{{ temp.reservationStatusName }}</span>
          </template>
        </el-form-item>

        <!--预约厂区-->
        <el-form-item label="预约厂区">
          <template>
            <span>{{ temp.factoryName }}</span>
          </template>
        </el-form-item>

        <!--预约时间-->
        <el-form-item label="预约时间">
          <template>
            <span>{{ temp.appointmentStartTime }} ~ {{ temp.appointmentEndTime }}</span>
          </template>
        </el-form-item>

        <!--来访事由-->
        <el-form-item label="来访事由">
          <template>
            <span>{{ temp.reservationEventName }}</span>
          </template>
        </el-form-item>

        <!--货物名称-->
        <el-form-item label="货物名称">
          <template>
            <span>{{ temp.goodsName }}</span>
          </template>
        </el-form-item>

        <!--前往区域-->
        <el-form-item label="前往区域">
          <template>
            <span>{{ temp.dockName }}</span>
          </template>
        </el-form-item>

        <!--供应商-->
        <el-form-item label="供应商">
          <template>
            <span>{{ temp.supplierName }}</span>
          </template>
        </el-form-item>

        <!--车牌号-->
        <el-form-item label="车牌号">
          <template>
            <span>{{ temp.licensePlate }}</span>
          </template>
        </el-form-item>

        <!--姓名-->
        <el-form-item label="姓名">
          <template>
            <span>{{ temp.name }}</span>
          </template>
        </el-form-item>

        <!--手机号-->
        <el-form-item label="手机号">
          <template>
            <span>{{ temp.phoneNum }}</span>
          </template>
        </el-form-item>

        <!--身份证号正面图片-->
        <el-form-item label="身份证正面图片">
          <template>
            <el-image :src="temp.idCardFrontPhotoUrl" style="width: 100px; height: 100px;"
              :preview-src-list="[temp.idCardFrontPhotoUrl]" />
          </template>
        </el-form-item>

        <!--货物清单图片-->
        <el-form-item label="货物清单图片">
          <template>
            <el-image v-for="url in temp.goodsListPhotoUrlList" :src="url" style="width: 100px; height: 100px;"
              :preview-src-list="temp.goodsListPhotoUrlList" />
          </template>
        </el-form-item>

        <el-form-item v-if="showAudit" label="审核意见">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
            placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="showAudit" type="primary" @click="auditPass(temp)">
          审核通过
        </el-button>
        <el-button v-if="showAudit" type="danger" @click="auditFallback(temp)">
          审核退回
        </el-button>
        <el-button @click="closeDialog()">
          取消
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchFactoryIdOptions, getImageBase64, auditPass, auditFallback, inFactory, outFactory, fetchPv, createArticle, updateArticle } from '@/api/reservation'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination



const orderStatus = [
  { key: 'PENDING_REVIEW', display_name: '预约中' },
  // { key: 'RETURNED_FOR_MODIFICATION', display_name: '需修改' },
  { key: 'RETURNED', display_name: '退回' },
  { key: 'RESERVATION_COMPLETED', display_name: '预约完成' },
  { key: 'QUEUEING', display_name: '排队中' },
  { key: 'IN_FACTORY', display_name: '进厂' },
  { key: 'FINISHED', display_name: '已完成' }
]


const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})



export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      factoryIdOptions: [],
      calendarTypeOptions,
      orderStatus,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        idCardPhoto: 'abc',
        status: 'published'
      },
      dialogFormVisible: false,
      showAudit: false,
      dialogStatus: '',
      textMap: {
        update: '详情',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getFactoryIdOptions()
  },
  methods: {
    async getImage(fileId) {
      const pageResponse = await getImageBase64(fileId)
      // this.temp.idCardPhoto = 'data:image/png;base64,' + pageResponse.data
      this.temp.idCardPhoto = pageResponse.data
      // getImageBase64(fileId).then(response => {
      //   console.log(response.data)
      //   this.temp.idCardPhoto = 'data:image/png;base64,' + response.data
      // })
    },
    getFactoryIdOptions() {
      fetchFactoryIdOptions().then(response => {
        this.factoryIdOptions = response.data.factoryBOList
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.reservationDetailRespList
        this.total = response.data.total

        // 对每个list组装图片URL
        this.list.forEach(item => {
          item.idCardFrontPhotoUrl = process.env.VUE_APP_BASE_API + '/reservation/getImage/' + item['idCardFrontPhotoFileId'] + '?_=' + new Date().getTime()

          // goodsListPhotoFileIdList
          item.goodsListPhotoUrlList = item.goodsListPhotoFileIdList.map(fileId => {
            return process.env.VUE_APP_BASE_API + '/reservation/getImage/' + fileId + '?_=' + new Date().getTime()
          })

        })

        this.listLoading = false
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    auditPass(temp) {
      auditPass(temp.reservationId, temp.reason).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.closeDialog()
        this.getList()
      })
    },
    auditFallback(temp) {
      if (!temp.reason) {
        this.$message({
          message: '请填写审核意见',
          type: 'warning'
        })
        return
      }
      auditFallback(temp.reservationId, temp.reason).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.closeDialog()
        this.getList()
      })
    },
    inFactory(row) {
      inFactory(row.reservationId).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.reservationStatus = 'IN_FACTORY'
        row.reservationStatusName = '进厂'
      })
    },
    outFactory(row) {
      outFactory(row.reservationId).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.reservationStatus = 'FINISHED'
        row.reservationStatusName = '已完成'
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        reservationId: '',
        name: '',
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        idCardFrontPhotoUrl: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.closeDialog()
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {}
      console.log(this.temp)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.showAudit = this.temp.reservationStatus === 'PENDING_REVIEW'
      this.$nextTick(() => {
        console.log('nextTick')
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.closeDialog()
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    closeDialog() {
      console.log('closeDialog')
      this.temp = {}
      this.dialogFormVisible = false

    },
    handleClose(done) {
      done();
      setTimeout(() => {
        this.temp = {}
      }, 300);

    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>