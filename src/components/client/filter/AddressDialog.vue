<template>
  <el-dialog
    v-model="modelDialogVisible"
    width="50%"
    :show-close="false"
    class="filter-dialog"
    top="10vh"
  >
    <template #header>
      <div class="dialog-header">
        <i class="bx bx-arrow-back" @click="closeDialog()"></i>
        <h2 class="dialog-title">{{ title }}</h2>
      </div>
    </template>
    <div class="dialog-body">
      <div v-if="isPicking === 1" class="list-radio">
        <label for="province-all" class="radio-item" @click="provincePicked()">
          <input type="radio" value="" id="province-all" v-model="modelFilterProvince" />
          <span>Toàn quốc</span>
        </label>
        <label
          v-for="province in provinces"
          :key="province.province_id"
          :for="`province-${province.province_id}`"
          @click="provincePicked(province)"
          class="radio-item"
        >
          <input
            type="radio"
            :value="province.province_name"
            :id="`province-${province.province_id}`"
            v-model="modelFilterProvince"
          />
          <span>{{ province.province_name }}</span>
        </label>
      </div>

      <div v-if="isPicking === 2" class="list-radio">
        <label for="district-all" class="radio-item" @click="districtPicked()">
          <input type="radio" value="" id="district-all" v-model="modelFilterDistrict" />
          <span>Tất cả</span>
        </label>
        <label
          v-for="district in districts"
          :key="district.district_id"
          :for="`district-${district.district_id}`"
          @click="districtPicked(district)"
          class="radio-item"
        >
          <input
            type="radio"
            :value="district.district_name"
            :id="`district-${district.district_id}`"
            v-model="modelFilterDistrict"
          />
          <span>{{ district.district_name }}</span>
        </label>
      </div>

      <div v-if="isPicking === 3" class="list-radio">
        <label for="ward-all" class="radio-item">
          <input type="radio" value="" id="ward-all" v-model="modelFilterWard" />
          <span>Tất cả</span>
        </label>
        <label
          v-for="ward in wards"
          :key="ward.ward_id"
          :for="`ward-${ward.ward_id}`"
          class="radio-item"
        >
          <input
            type="radio"
            :value="ward.ward_name"
            :id="`ward-${ward.ward_id}`"
            v-model="modelFilterWard"
          />
          <span>{{ ward.ward_name }}</span>
        </label>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import AddressService from '@/services/AddressService';
export default {
  props: {
    dialogVisible: Boolean,
    filterProvince: String,
    filterDistrict: String,
    filterWard: String,
  },
  data() {
    return {
      title: 'Chọn tỉnh thành',
      provinces: [],
      districts: [],
      wards: [],
      isPicking: 1,
    };
  },
  mounted() {
    this.getProvinces();
  },
  computed: {
    modelDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(value) {
        this.$emit('triggerDialog', value);
      },
    },
    modelFilterProvince: {
      get() {
        return this.filterProvince;
      },
      set(value) {
        this.$emit('triggerFilterProvince', value);
      },
    },
    modelFilterDistrict: {
      get() {
        return this.filterDistrict;
      },
      set(value) {
        this.$emit('triggerFilterDistrict', value);
      },
    },
    modelFilterWard: {
      get() {
        return this.filterWard;
      },
      set(value) {
        this.$emit('triggerFilterWard', value);
      },
    },
  },
  methods: {
    async getProvinces() {
      const res = await AddressService.getProvinces();
      if (res.status === 200) {
        this.provinces = res.data.results;
      }
    },
    async getDistricts(id) {
      const res = await AddressService.getDistricts(id);
      if (res.status === 200) {
        this.districts = res.data.results;
      }
    },
    async getWards(id) {
      const res = await AddressService.getWards(id);
      if (res.status === 200) {
        this.wards = res.data.results;
      }
    },
    provincePicked(province) {
      this.modelFilterDistrict = '';
      this.modelFilterWard = '';
      if (province) {
        this.isPicking = 2;
        this.modelFilterProvince = province.province_name;
        this.title = province.province_name;
        this.getDistricts(province.province_id);
      }
    },
    districtPicked(district) {
      this.modelFilterWard = '';
      if (district) {
        this.isPicking = 3;
        this.title = district.district_name;
        this.modelFilterDistrict = district.district_name;
        this.getWards(district.district_id);
      }
    },
    closeDialog() {
      if (this.isPicking === 3) {
        this.title = this.modelFilterProvince;
        this.isPicking = 2;
      } else if (this.isPicking === 2) {
        this.title = 'Chọn tỉnh thành';
        this.isPicking = 1;
      } else {
        this.modelDialogVisible = false;
      }
    },
  },
};
</script>

<style src="@/assets/styles/client/filter_dialog.css"></style>
