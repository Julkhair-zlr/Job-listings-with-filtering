<!-- Javascript or script part -->
<script>
import Data from "../data/data.json";
import { reactive, computed, onMounted } from "vue";

export default {
  setup() {
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
      } else {
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
    return {
      listdatas,
      filteredData,
      selectedFilters,
      gettingSeletedFilterVal,
      deleteVal,
      clearFun,
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
  <div class="firstDiv">
    <!-- bg-img -->
    <div class="imgdiv" />
    <!-- chip card -->
    <div class="chipdiv" v-if="selectedFilters.length > 0">
      <div class="chip" v-for="a in selectedFilters" :key="a">
        <div class="closebtn">
          {{ a }}
        </div>
        <div @click="deleteVal(a)" style="font-size: 40px">&times;</div>
      </div>

      <button @click="clearFun">Clear</button>
    </div>
    <!-- cards -->
    <div
      class="card"
      v-for="item in filteredData"
      :key="item.id"
      :class="getClassname(item.featured)"
    >
      <!-- card content -->
      <div class="container">
        <!--company img  -->
        <div class="containerImg">
          <img :src="item.logo" alt="" width="80" height="80" />
        </div>
        <div style="width: 35%">
          <div class="containerHeader">
            <h4 style="color: #5ca4a3">{{ item.company }}</h4>
            <h5 v-if="item.new === true" class="containerNew">NEW!</h5>
            <h5 v-if="item.featured === true" class="containerFeature">
              FEATURED!
            </h5>
          </div>
          <div>
            <h3>
              <b>{{ item.position }}</b>
            </h3>

            <div class="containerPostedDetails">
              <li style="list-style: none">{{ item.postedAt }}</li>
              <li>{{ item.contract }}</li>
              <li>{{ item.location }}</li>
            </div>
          </div>
        </div>
        <div>
          <!-- card content btns -->
          <div class="containerBtns">
            <button
              v-for="lan = [...new Set[item.languages]()] of item.languages"
              :key="lan"
              @click="gettingSeletedFilterVal(lan)"
            >
              {{ lan }}
            </button>
            <button @click="gettingSeletedFilterVal(item.level)">
              {{ item.level }}
            </button>
            <button @click="gettingSeletedFilterVal(item.role)">
              {{ item.role }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Css part -->

<style scoped>
.firstDiv {
  /* border: 2px solid blue; */
  display: flex;
  gap: 3%;
  flex-wrap: wrap;
  height: 100vh;
  max-height: 100vh;
}
.imgdiv {
  height: 8rem;
  width: 98vw;
  background-color: #5da4a4;
  background-image: url("../assets/images/bg-header-desktop.svg");
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 20px;
}
.chipdiv {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 10%;
  left: 13%;
  background-color: white;
  width: 70%;
  height: auto;
  border-radius: 10px;
  padding: 5px 8px;
}
.chip {
  display: inline-block;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  height: 20px;
  font-size: 15px;
  line-height: 15px;
  border-radius: 8px;
  background-color: #d1e9e9;
}

.closebtn {
  padding-left: 10px;
  color: #79a6a5;
  font-weight: bold;
  float: right;
  font-size: 18px;
}

.chip div:nth-child(2) {
  color: #79a6a5;
}
.chip div:nth-child(2):hover {
  color: black;
}
.card {
  margin-left: 10%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 80%;
  max-height: 23%;
  /* overflow-y: auto; */
}
@media screen and (max-width: 532px) {
  .card {
    max-height: 80%;
  }
}

.class-name {
  border-left-style: solid;
  border-left-color: blue;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  display: flex;
  align-items: center;
  gap: 5%;
  padding: 2px 10px;
  flex-wrap: wrap;
}
.containerImg {
  overflow: hidden;
  border-radius: 50%;
}
.containerHeader {
  display: flex;
  align-items: center;
  gap: 2%;
  flex-wrap: wrap;
}
.containerNew {
  background-color: #5ca4a3;
  color: white;
  border-radius: 30%;
}
.containerFeature {
  background-color: black;
  color: white;
  border-radius: 10%;
  border-bottom: #5ca4a3;
}
.containerPostedDetails {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
}
.containerBtns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

button {
  cursor: pointer;
  background-color: #d1e9e9;
  border: none;
  outline: none;
  width: 5rem;
  height: 2rem;
  border-radius: 10px;
  color: #79a6a5;
  font-weight: bold;
}
button:hover {
  background-color: #5ca4a3;
  color: white;
}
</style>






