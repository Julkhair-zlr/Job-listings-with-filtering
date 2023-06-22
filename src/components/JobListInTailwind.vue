<!-- Javascript or script part -->
<script>
import Data from "../data/data.json";
import { reactive, computed, onMounted, ref } from "vue";

export default {
  setup() {
    const toogleActiveIndex = ref(null);
    const listdatas = reactive({
      data: Data,
    });
    const selectedFilters = reactive([]);
    const filteredData = computed(() => {
      if (selectedFilters.length === 0) {
        return listdatas.data;
      } else {
        return listdatas.data.filter((item) => {
          return (
            selectedFilters.includes(item.languages[0]) ||
            selectedFilters.includes(item.level) ||
            selectedFilters.includes(item.role)
          );
        });
      }
    });
    onMounted(() => {
      filteredData;
    });
    const gettingSeletedFilterVal = (filter) => {
      if (selectedFilters.includes(filter)) {
        selectedFilters.splice(selectedFilters.indexOf(filter), 1);
        toogleActiveIndex.value = null;
      } else {
        toogleActiveIndex.value = null;
        selectedFilters.push(filter);
      }
    };
    const deleteVal = (filter) => {
      if (selectedFilters.length === 1) {
        clearFun();
      }
      selectedFilters.splice(selectedFilters.indexOf(filter), 1);
    };
    const clearFun = () => {
      selectedFilters.splice(0, selectedFilters.length);
    };
    const toggleAccordion = (index) => {
      if (toogleActiveIndex.value === index) {
        toogleActiveIndex.value = null;
      } else {
        toogleActiveIndex.value = index;
      }
    };
    return {
      listdatas,
      filteredData,
      selectedFilters,
      gettingSeletedFilterVal,
      deleteVal,
      clearFun,
      toogleActiveIndex,
      toggleAccordion,
    };
  },

  computed: {
    getClassname(item) {
      return () => ({
        card: true,
        "class-name": item === true ? true : false,
      });
    },
  },
};
</script>
<!-- Html tag based part -->
<template>
  <div class="flex flex-wrap gap-10 min-h-full min-w-full">
    <!-- bg-img -->
    <div class="bg-[#5da4a4] w-full h-36 bg-hero-pattern bg-cover" />
    <!-- chip card -->
    <div
      class="flex-1 flex bg-white flex-wrap rounded-lg absolute top-[7%] left-[10%] w-[80%] h-auto py-1.5 px-2 gap-3"
      v-if="selectedFilters.length > 0"
    >
      <div
        class="flex gap-2 justify-center items-center h-5 py-4 px-2 cursor-pointer bg-[#d1e9e9] leading-4 rounded-lg"
        v-for="a in selectedFilters"
        :key="a"
      >
        <div class="pl-3 text-[#79a6a5] font-bold float-right text-md">
          {{ a }}
        </div>
        <div
          @click="deleteVal(a)"
          class="text-3xl text-[#79a6a5] hover:text-black"
        >
          &times;
        </div>
      </div>

      <button
        class="z-20 absolute right-2 cursor-pointer bg-[#d1e9e9] border-none outline-none w-20 h-8 rounded-md text-[#79a6a5] font-bold hover:bg-[#5ca4a3] hover:text-white hover:underline"
        @click="clearFun"
      >
        Clear
      </button>
    </div>
    <!-- cards -->
    <!-- class="card" -->

    <div
      class="ml-[10%] shadow-lg ease-out duration-500 rounded-lg w-[80%] hover:shadow-my-own-shadow-hover flex flex-col justify-between"
      v-for="(item, index) in filteredData"
      :key="item.id"
      :class="getClassname(item.featured)"
      @click="toggleAccordion(index)"
    >
      <!-- card content -->
      <div class="flex items-center gap-4 py-3 px-2.5 flex-wrap">
        <!--company img  -->
        <div class="overflow-hidden rounded-full">
          <img :src="item.logo" alt="" width="70" height="70" />
        </div>
        <div class="w-[62%]">
          <div class="flex items-center flex-wrap gap-1">
            <h4 class="text-[#5ca4a3] font-bold">{{ item.company }}</h4>
            <h5
              v-if="item.new === true"
              class="bg-[#5ca4a3] text-white rounded-lg text-sm"
            >
              NEW!
            </h5>
            <h5
              v-if="item.featured === true"
              class="bg-black text-white rounded-lg text-sm"
            >
              FEATURED!
            </h5>
          </div>
          <!-- company name -->
          <div>
            <h3>
              <b>{{ item.position }}</b>
            </h3>
            <div class="flex flex-wrap gap-2">
              <li style="list-style: none">{{ item.postedAt }}</li>
              <li>{{ item.contract }}</li>
              <li>{{ item.location }}</li>
            </div>
          </div>
        </div>
        <div >
          <!-- card content btns -->
          <div class="flex justify-center items-center gap-2 flex-wrap">
            <button
              class="cursor-pointer bg-[#d1e9e9] border-none outline-none w-20 h-8 rounded-md text-[#79a6a5] font-bold hover:bg-[#5ca4a3] hover:text-white"
              v-for="lan = [...new Set[item.languages]()] of item.languages"
              :key="lan"
              @click="gettingSeletedFilterVal(lan)"
            >
              {{ lan }}
            </button>
            <button
              class="cursor-pointer bg-[#d1e9e9] border-none outline-none w-20 h-8 rounded-md text-[#79a6a5] font-bold hover:bg-[#5ca4a3] hover:text-white"
              @click="gettingSeletedFilterVal(item.level)"
            >
              {{ item.level }}
            </button>
            <button
              class="cursor-pointer bg-[#d1e9e9] border-none outline-none w-20 h-8 rounded-md text-[#79a6a5] font-bold hover:bg-[#5ca4a3] hover:text-white"
              @click="gettingSeletedFilterVal(item.role)"
            >
              {{ item.role }}
            </button>
          </div>
        </div>
        <span v-if="toogleActiveIndex === index" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </div>
      <div
        v-if="toogleActiveIndex === index"
        class="text-md p-4 bg-white border border-gray-200"
      >
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<!-- Css part -->

<style scoped>
.class-name {
  border-left-style: solid;
  border-left-color: blue;
}
</style>






