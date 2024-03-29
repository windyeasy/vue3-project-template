<script setup>
const props = defineProps({
  contentConfig: {
    type: Object,
    default: () => ({
      propsList: [],
    }),
  },
  data: {
    type: Array,
    default: () => [],
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  pageTotalCount: {
    type: Number,
    default: 0,
  },
  paginationConfig: {
    type: Object,
    default: () => ({}),
  },
  paginationPostion: {
    type: String,
    default: "right", // 'left' | 'center' | 'right'
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});

// 定义ref
const tableRef = ref();
const paginationRef = ref();

// 定义发出事件
const emit = defineEmits(["paginationChange", "selectionChange"]);
// 分页处理
const currentPage = ref(1);
const pSize = ref(10);
// 设置绑定大小
watchEffect(() => {
  pSize.value = props.pageSize;
});
// 分页排版位置
const getPagePostion = computed(() => {
  switch (props.paginationPostion) {
    case "right":
      return "flex-end";
    case "center":
      return "center";
    default:
      return "flex-start";
  }
});
// 添加分页处理

function paginationChange() {
  const queryInfo = { pageNum: currentPage.value, pageSize: pSize.value };
  emit("paginationChange", queryInfo);
}
function handleSizeChange(val) {
  pSize.value = val;
  paginationChange();
}
function handleCurrentChange() {
  paginationChange();
}

function handleSelectionChange(rows) {
  emit("selectionChange", rows);
}

// 抛出处理方法
defineExpose({
  // 获取el-table-ref用来作一些特殊操作
  getTableRef() {
    return tableRef.value;
  },
  // 获取el-pagination-ref作一些特殊操作
  getPaginationRef() {
    return paginationRef.value;
  },
});
</script>

<template>
  <div class="page-content">
    <div class="table">
      <el-table
        :data="data"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenProps"
        @selection-change="handleSelectionChange"
        ref="tableRef"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'tag'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <el-tag v-bind="item.tags[scope.row[item.prop]]">
                  {{ item.tags[scope.row[item.prop]].text }}
                </el-tag>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div
      class="pagination"
      v-if="showPagination"
      :style="{ justifyContent: getPagePostion }"
    >
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pSize"
        ref="paginationRef"
        :page-sizes="[10, 20, 40, 80]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        background
        v-bind="paginationConfig"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
  display: flex;
}
</style>
