<template>
  <div>
    <h1>上传</h1>
    <el-upload
      class="upload-demo" 
      ref="upload" 
      drag
      action="https://jsonplaceholder.typicode.com/posts/" 
      :auto-upload="false" 
      list-type="picture-card" 
      :file-list="fileList" 
      :on-error="handleError" 
      :on-upload="beforeAvatarUpload" 
      :on-change="handleChange" 
      :on-success="handleSuccess" 
      accept="image/*"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <button @click="submitUpload">上传</button>
    <div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :pager-count="9"
        layout="total, sizes, prev, pager, next, jumper"
        :total="810">
      </el-pagination>

    </div>


    <div class="xlsx-box">
      <el-upload ref="upload" action="/wm/upload/" :show-file-list="false" :auto-upload="false" :on-change="readExcel">
        <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
      </el-upload>

    </div>

    


  </div>
</template>


<script>
  import XLSX from 'xlsx'


  export default {
    data() {
      return {
        alerts: [],
        total: 0,
        pageCount: 10,
        currentPage: 1,
        currentPage1: 1,
        fileList: [{name: 'food.jpeg', url: '/static/logo.png'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleCurrentChange(val) {
        console.log(val)
      },
      handleSizeChange(val) {
        console.log(val)
      },




      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleChange(file) {
        console.log('改变', file)
        const isJPG = file.raw.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }

      },
      handleError(err, file, fileList) {
        console.log('失败', err)
      },
      handleSuccess(response, file, fileList) {
        console.log('成功', response)
      },
      // 上传前判断文件类型
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        return isJPG && isLt2M;

      },
      handlePreview(file) {
        console.log(file);
      },


      readExcel(file) {
        // 定义fileReader，存放读取excel方法
        const fileReader = new FileReader()
        // 启动函数
        fileReader.readAsBinaryString(file.raw)

        // 监听
        fileReader.onload = (ev) => {
          let data = ev.target.result
          let workbook = XLSX.read(data, {type: 'binary'})
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            console.log(sheetArray)
          }
        }



      }
    },

  }
</script>

<style scoped>
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .xlsx-box{
    margin-top: 30px;
  }

</style>
