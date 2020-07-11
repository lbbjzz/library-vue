<template>
    <div class="manage">
        <el-button style="float:left" type="primary" @click="dialogFormVisible = true">+ 添加</el-button>
        <el-dialog title="添加图书" :visible.sync="dialogFormVisible" style="text-align: center">
            <el-form :model="form" :rules="addrules">
                <el-form-item label="书名:" :label-width="formLabelWidth" prop="bookName">
                    <el-input v-model="form.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者:" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="form.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社:" :label-width="formLabelWidth" prop="pubHouse">
                    <el-input v-model="form.pubHouse" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版年份:" :label-width="formLabelWidth" prop="pubDate">
                    <el-input v-model="form.pubDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别:" prop="classes" :label-width="formLabelWidth">
                    <el-select v-model="form.classes" autocomplete="off" style="float: left">
                        <el-option label="悬疑小说" value="悬疑小说"></el-option>
                        <el-option label="幼儿读物" value="幼儿读物"></el-option>
                        <el-option label="中国儿童文学" value="中国儿童文学"></el-option>
                        <el-option label="外国儿童文学" value="外国儿童文学"></el-option>
                        <el-option label="传记" value="传记"></el-option>
                        <el-option label="青春文学" value="青春文学"></el-option>
                        <el-option label="艺术" value="艺术"></el-option>
                        <el-option label="动漫" value="动漫"></el-option>
                        <el-option label="摄影" value="摄影"></el-option>
                        <el-option label="哲学宗教" value="哲学宗教"></el-option>
                        <el-option label="政治军事" value="政治军事"></el-option>
                        <el-option label="社会科学" value="社会科学"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="馆藏数量:" :label-width="formLabelWidth" prop="quantity">
                    <el-input v-model="form.quantity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBook()">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="库存修改" :visible.sync="edit" modal-append-to-body="false" style="text-align: center">
            <el-form ref="edit" :model="editForm" :rules="editRules">
                <el-form-item label="书名:" :label-width="formLabelWidth" prop="bookName">
                    <el-input v-model="editForm.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者:" :label-width="formLabelWidth" prop="author">
                    <el-input v-model="editForm.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社:" :label-width="formLabelWidth" prop="pubHouse">
                    <el-input v-model="editForm.pubHouse" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版年份:" :label-width="formLabelWidth" prop="pubDate">
                    <el-input v-model="editForm.pubDate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别:" prop="classes" :label-width="formLabelWidth">
                    <el-select v-model="editForm.classes" autocomplete="off" style="float: left">
                        <el-option label="悬疑小说" value="悬疑小说"></el-option>
                        <el-option label="幼儿读物" value="幼儿读物"></el-option>
                        <el-option label="中国儿童文学" value="中国儿童文学"></el-option>
                        <el-option label="外国儿童文学" value="外国儿童文学"></el-option>
                        <el-option label="传记" value="传记"></el-option>
                        <el-option label="青春文学" value="青春文学"></el-option>
                        <el-option label="艺术" value="艺术"></el-option>
                        <el-option label="动漫" value="动漫"></el-option>
                        <el-option label="摄影" value="摄影"></el-option>
                        <el-option label="哲学宗教" value="哲学宗教"></el-option>
                        <el-option label="政治军事" value="政治军事"></el-option>
                        <el-option label="社会科学" value="社会科学"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="editForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="馆藏数量:" prop="quantity" :label-width="formLabelWidth" style="margin-left: 90px">
                    <el-input v-model="editForm.quantity" autocomplete="off" style="width: 60%;float: left"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="edit = false">取 消</el-button>
                <el-button type="primary" @click="editBook">确 定</el-button>
            </div>
        </el-dialog>

        <el-button style="float: right;margin-left: 10px" type="primary" icon="el-icon-search" @click="search">搜索
        </el-button>
        <el-input
                placeholder="请输入图书名称"
                prefix-icon="el-icon-search"
                v-model="searchContent"
                style="width: 20%;float: right">
        </el-input>
        <el-table
                :data="tableData"
                height="120%"
                style="width: 100%" stripe>
            <el-table-column
                    prop="id"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="cover"
                    label="封面"
                    width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" alt="" style="width: 80px;height:100px">
                </template>
            </el-table-column>
            <el-table-column
                    prop="bookName"
                    label="书名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="pubHouse"
                    label="出版社"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="pubDate"
                    label="出版年份"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="classes"
                    label="类别"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="馆藏数量"
                    width="130">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleApply(scope.$index, scope.row)">编辑</el-button>
                    <el-button @click="deleteById(scope.row)" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="padding-top: 20px"
                class="pager"
                background layout="prev, pager, next"
                page-size="5"
                :total="total"
                @current-change="page">
        </el-pagination>
    </div>
</template>

<script>

export default {
  data () {
    return {
      searchContent: '',
      total: null,
      tableData: [],
      edit: false,
      editForm: {
        bookName: '',
        author: '',
        pubHouse: '',
        pubDate: '',
        classes: '',
        price: '',
        quantity: ''
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        bookName: '',
        author: '',
        pubHouse: '',
        pubDate: '',
        classes: '',
        price: '',
        quantity: ''
      },
      editRules: {
        bookName: [
          {
            required: true,
            message: '请输入书名！',
            trigger: 'blur'
          }
        ],
        author: [
          {
            required: true,
            message: '请输入作者！',
            trigger: 'blur'
          }
        ],
        puHouse: [
          {
            required: true,
            message: '请输入出版社！',
            trigger: 'blur'
          }
        ],
        pubDate: [
          {
            required: true,
            message: '请输入出版时间！',
            trigger: 'blur'
          }
        ],
        classes: [
          {
            required: true,
            message: '请选择类别！',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入价格！',
            trigger: 'blur'
          }
        ],
        quantity: [
          {
            required: true,
            message: '请输入库存！',
            trigger: 'blur'
          }
        ]
      },
      addrules: {
        bookName: [
          {
            required: true,
            message: '请输入书名！',
            trigger: 'blur'
          }
        ],
        author: [
          {
            required: true,
            message: '请输入作者！',
            trigger: 'blur'
          }
        ],
        puHouse: [
          {
            required: true,
            message: '请输入出版社！',
            trigger: 'blur'
          }
        ],
        pubDate: [
          {
            required: true,
            message: '请输入出版时间！',
            trigger: 'blur'
          }
        ],
        classes: [
          {
            required: true,
            message: '请选择类别！',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入价格！',
            trigger: 'blur'
          }
        ],
        quantity: [
          {
            required: true,
            message: '请输入库存！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addBook () {
      console.log(this.form, 'form')
      this.$http.post('/api/book/save', this.form)
      this.$message({
        message: '添加成功！',
        type: 'success'
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        window.location.reload()
      }, 1000)
      this.dialogFormVisible = false
    },
    editBook () {
      console.log(this.editForm)
      this.$http.put('/api/book/update', this.editForm)
      this.edit = false
      this.timer = setTimeout(() => {
        window.location.reload()
      }, 1000)
      this.dialogFormVisible = false
    },
    handleApply: function (index, row) {
      const _this = this
      _this.editForm = row
      _this.edit = true
    },
    search () {
      const _this = this
      // const param = new URLSearchParams()
      // param.append('bookName', '_this.searchContent')
      if (_this.searchContent === '') {
        _this.$message.warning('请输入查询内容')
      } else {
        this.$http.get('/api/book/findByName/' + _this.searchContent + '/1/5').then(function (resp) {
          console.log(resp.data)
          // const arr = []
          // for (const i in resp) {
          //   arr.push(resp[i])
          // }
          _this.tableData = resp.data.data
          // console.log(_this.tableData, 'Data')
        })
      }
    },
    deleteById (row) {
      const _this = this
      _this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/book/deleteById/' + row.id).then(function (resp) {
          _this.$message({
            type: 'success',
            message: '删除成功'
          })
          clearTimeout(_this.timer)
          _this.timer = setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    page (currentPage) {
      // alert(currentPage)
      const _this = this
      this.$http.get('/api/book/findAll/' + currentPage + '/5').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.data
        _this.total = resp.data.totalCount
      })
    }
  },
  created () {
    const _this = this
    this.$http.get('/api/book/findAll/1/5').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data.data
      _this.total = resp.data.totalCount
    })
  }
}
</script>

<style lang="scss" scoped>
    .manage {
        height: 70%;

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
    }

    .pager {
        position: absolute;
        right: 20px;
    }
</style>
