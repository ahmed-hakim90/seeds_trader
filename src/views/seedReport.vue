<template>
  <v-row>
    <v-btn id="print-btn" color="#294964" class="mr-4" dark @click="print">
      <v-icon class="ml-2">mdi-printer</v-icon>
      طباعة
    </v-btn>
    <v-col cols="12" class="text-center">
      <v-alert type="info" text v-if="alartApp">
        {{ msgAlert }}
      </v-alert>
      <v-alert type="success" text v-if="alartAppSuc">
        {{ msgAlert }}
      </v-alert>
      <p class="display-1 line-after">
        تقرير بذرة
      </p>
    </v-col>
    <v-col cols="4" class="not-print">
      <v-autocomplete
        @click="searchSeedAccount"
        v-model="callFunShow"
        :items="seeds"
        :loading="isLoading"
        color="warning"
        item-text="name"
        label="اسم البذرة"
        outlined
        clearable
        single-line
        hide-details
        placeholder="بحث البذرة"
        prepend-inner-icon="mdi-seed"
        return-object
      >
        <template v-slot:item="{ item }">
          <div
            class="v-list-item v-list-item--link theme--light"
            @click="getDataSeedToAcc(item)"
          >
            {{ item.name }}
          </div>
        </template>

        <template v-slot:no-results>
          <div class="text-center" style="color: #294964">
            لا يوجد بيانات مطابقة
          </div>
        </template>
        <template v-slot:no-data>
          <div class="text-center" style="color: #294964">
            لا يوجد بيانات
          </div>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="3" class="not-print">
      <v-menu
        v-model="showPickerStart"
        :close-on-content-click="false"
        :nudge-right="10"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="pickerStart"
            label="من"
            prepend-inner-icon="mdi-calendar-month"
            readonly
            outlined
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          color="#294964"
          v-model="pickerStart"
          @input="showPickerStart = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="3" class="not-print">
      <v-menu
        v-model="showPickerEnd"
        :close-on-content-click="false"
        :nudge-right="10"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="pickerEnd"
            label="الي"
            outlined
            :value="endDate"
            prepend-inner-icon="mdi-calendar-month"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          color="#294964"
          v-model="pickerEnd"
          @input="showPickerEnd = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="2" class="not-print">
      <v-btn color="#294964" dark block min-height="55" @click="showReportSeed"
        >عرض
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-card
        color="#294964"
        min-height="115"
        max-height="115"
        dark
        elevation="5"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              <v-icon class="ml-2">mdi-seed</v-icon>
              {{ seed.name }}
            </v-card-title>

            <span>
              <v-icon class="mr-4">
                mdi-calendar-month
              </v-icon>
              التاريخ</span
            >
            <span> من {{ pickerStart }}</span>
            <span> / </span>
            <span> الي {{ pickerEnd }}</span>
          </div>

          <v-col cols="6" class="padding-0">
            <div class="left-side-card d-flex justify-end">
              <table>
                <!-- <caption class="title font-weight-bold">
                  اجمالي حركة و رصيد
                </caption> -->
                <tbody>
                  <tr>
                    <th rowspan="1">
                      اجمالي الكمية المباعة في كل الفترات
                    </th>
                    <th class="p-2">
                      اجمالي الكمية الحالية
                    </th>
                    <th class="p-2">
                      اجمالي الكمية المشترى
                    </th>
                  </tr>
                  <tr v-if="reportSeed">
                    <td>
                      {{ seed.soldQuantity }}
                    </td>
                    <td>
                      {{ seed.quantity }}
                    </td>
                    <td>
                      {{ seed.boughtQuantity }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-col>
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="!reportSeed">
      <v-card class="loader" height="650">
        <v-alert type="error" text>
          برجاء ادخل البيانات لاظهار التقرير
        </v-alert>
      </v-card>
    </v-col>
    <v-col cols="12" class="show-data-clients">
      <template v-if="reportSeed">
        <v-data-table
          :search="searchSeed"
          :headers="headersName"
          :items="reportSeed"
          :items-per-page="50"
          class="elevation-9"
        >
          <template v-slot:no-results>
            لا يوجد بيانات
          </template>
          <template v-slot:item.date="{ item }">
            <span>{{ new Date(item.date).toLocaleDateString() }}</span>
          </template>
          <template v-slot:item.maden="{ item }">
            <span>{{
              item.tahdeen + item.dofaatSadera + item.mortgaa + item.khasmMoktsb
            }}</span>
          </template>
          <template v-slot:item.dayen="{ item }">
            <span>{{ item.moshtryat + item.dofaatWareda }}</span>
          </template>
        </v-data-table>
      </template>
    </v-col>
  </v-row>
</template>
<script>
// import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "accountclient",
  data: () => ({
    msgAlert: "",
    alartAppSuc: false,
    alartApp: false,
    isLoading: false,

    searchSeed: "",
    callFunShow: null,

    seedSelectedToAcc: {
      id: 0,
      name: "",
      unit: "",
      quantity: "",
      sellingPrice: "",
      buyingPrice: "",
      boughtQuantity: ""
    },
    seed: {
      id: 0,
      name: "",
      unit: "",
      quantity: "",
      soldQuantity: null,
      sellingPrice: "",
      buyingPrice: "",
      boughtQuantity: ""
    },

    showPickerStart: false,
    showPickerEnd: false,
    pickerStart: new Date().toISOString().substr(0, 10),
    pickerEnd: new Date().toISOString().substr(0, 10),
    pickerStartStemp: 0,
    pickerEndStemp: 0,
    seedIndexToAcc: -1,

    headersName: [
      // { text: "كود", value: "id", align: "center" },
      { text: "التاريخ ", value: "date", dataType: "Date", align: "center" },
      { text: "اسم العميل", value: "clientName", align: "center" },
      { text: "الحركة ", value: "haraka", align: "center" },
      { text: "نوع الطلب ", value: "type", align: "center" },
      { text: "الكمية", value: "quantity", align: "center" },
      { text: "الوحدة", value: "unit", align: "center" },
      { text: "سعر الشراء", value: "sellingPrice", align: "center" },
      { text: "سعر البيع", value: "buyingPrice", align: "center" },
      { text: "مدين", value: "dayen", align: "center" },
      { text: "دائن", value: "maden", align: "center" }
    ]
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.showMsg = false;
      this.alertApp = false;
      this.alartAppSuc = false;
    }, 8000);
    setTimeout(() => {
      this.searchSeedAccount();
      // this.searchSeedOrder();
    }, 500);
  },
  watch: {
    callFunShow() {
      this.showReportSeed();
    },
    pickerStart() {
      this.alartApp = true;
      this.msgAlert = "برجاء اضغط علي زر العرض لاظهار البيانات الجديدة";
      this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
      this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
    },
    pickerEnd() {
      this.alartApp = true;
      this.msgAlert = "برجاء اضغط علي زر العرض لاظهار البيانات الجديدة";
      this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
      this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
    }
  },
  computed: {
    startDate() {
      return this.date
        ? this.pickerStart.format("dd, MMM  YYYY 00:01:00 UTC")
        : "";
    },
    endDate() {
      return this.date
        ? this.pickerEnd.format("dd, MMM  YYYY 00:01:00 UTC")
        : "";
    },
    //  to get data from api  with vuex |||||||||||||||||||||||||||||||||||||||||||
    ...mapState(["seeds", "reportSeed"])
  },
  mounted() {
    this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
    this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
  },
  methods: {
    searchSeedAccount() {
      this.$store.dispatch("loadSeeds");
    },
    getDataSeedToAcc(item) {
      // this to get data selected from api for specific client
      this.seedIndexToAcc = this.seeds.indexOf(item);
      this.seedSelectedToAcc = Object.assign({}, item);
      Object.assign(this.seeds[this.seedIndexToAcc], this.seedSelectedToAcc);
      this.seed.name = this.seedSelectedToAcc.name;
      this.seed.id = this.seedSelectedToAcc.id;
      this.seed.buyingPrice = this.seedSelectedToAcc.buyingPrice;
      this.seed.sellingPrice = this.seedSelectedToAcc.sellingPrice;
      this.seed.unit = this.seedSelectedToAcc.unit;
      this.seed.quantity = this.seedSelectedToAcc.quantity;
      this.seed.soldQuantity = this.seedSelectedToAcc.soldQuantity;
      this.seed.boughtQuantity = this.seedSelectedToAcc.boughtQuantity;
      // this to assign  variables  from get api to vars to post api
      //this to hide table after select client in perparing order
    },
    showReportSeed() {
      if (this.seedSelectedToAcc.id != 0) {
        this.alartAppSuc = true;
        this.alartApp = false;
        this.msgAlert = "تم تحديث البيانات";

        let payload = {
          id: this.seedSelectedToAcc.id,
          pickerStartStemp: this.pickerStartStemp,
          pickerEndStemp: this.pickerEndStemp
          /* more parameters */
        };
        this.$store.dispatch("loadReportSeed", payload);
      } else {
        this.alartApp = true;
        this.msgAlert = "برجاء اختيار البذرة!!";
      }
    },
    print() {
      // Pass the element id here
      window.print();
    }
  }
};
</script>
