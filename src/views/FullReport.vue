<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card class="text-center add-client sell">
        <div class="overlay"></div>
        <v-card-title>
          <span class="headline"> تعديل عملية {{ order.type }} </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="text-center">
              <v-col cols="12" class="top">
                <v-text-field
                  label="اسم العميل"
                  v-model="order.clientName"
                  dark
                  outlined
                ></v-text-field>
              </v-col>
              <v-row class="servey">
                <v-col cols="12" class="top"> </v-col>
                <v-col cols="4" class="top">
                  <v-text-field
                    label="اسم البذرة "
                    v-model="order.seedName"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="الكمية"
                    v-model="kmaia"
                    suffix="كيلو جرام"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="سعر"
                    v-model="price"
                    suffix="جنية"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="كيلو"
                    dark
                    type="number"
                    outlined
                    disabled
                    v-model="order.unit"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="detail-cost">
                <!-- <span class="caption  font-weight-bold-" >  مدين </span> -->
                <v-col cols="2">
                  <v-text-field
                    label="دفعات واردة"
                    v-model="order.dofaatWareda"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="تحضين"
                    v-model="order.tahdeen"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="خصم مكتسب"
                    v-model="order.khasmMoktsb"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="مرتجع"
                    v-model="order.mortgaa"
                    dark
                    outlined
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="detail-cost">
                <!-- <span class="caption  font-weight-bold-"> مدين </span> -->
                <v-col cols="2">
                  <v-text-field
                    label="دفعات واردة"
                    v-model="order.dofaatSadera"
                    type="number"
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="مشتريات"
                    v-model="order.moshtryat"
                    dark
                    disabled
                    type="number"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="all-cost">
                  <v-text-field
                    label="اجمالي التكلفة"
                    v-model="order.moshtryat"
                    disabled
                    dark
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="green darken-1" @click="save">حفظ</v-btn>
          <v-btn color="info darken-1" @click="close">الغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn id="print-btn" color="#294964" class="mr-4" dark @click="print">
      <v-icon class="ml-2">mdi-printer</v-icon>
      طباعة
    </v-btn>

    <v-alert
      border="bottom"
      colored-border
      type="success"
      transition="leave-to-class"
      color="green"
      elevation="2"
      dismissible
      v-if="showMsgSuc"
    >
      {{ msg }}
    </v-alert>
    <v-alert
      border="bottom"
      colored-border
      type="error"
      transition="leave-to-class"
      color="red"
      elevation="2"
      dismissible
      v-if="msgError"
    >
      {{ msg }}
    </v-alert>
    
    <v-col cols="12" class="text-center">
      <p class="display-1 line-after">تقرير شامل</p>
    </v-col>
    <v-row class="to-print">
      <v-col cols="12">
        <v-card
          color="#294964"
          min-height="115"
          dark
          class="padding-card "
          elevation="5"
        >
          <v-row>
            <v-col cols="3">
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
                    prepend-icon="mdi-event"
                    readonly
                    outlined
                    dark
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
            <v-col cols="3">
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
                    dark
                    :value="endDate"
                    prepend-icon="mdi-event"
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
            <v-col cols="6" class="padding-0">
              <div class="left-side-card d-flex justify-end">
                <table>
                  <!-- <caption class="title font-weight-bold">
                اجمالي حركة و رصيد
              </caption> -->
                  <tbody>
                    <tr>
                      <th class="p-2">
                        دفعات واردة
                      </th>
                      <th class="p-2">
                        تحضين
                      </th>
                      <th class="p-2">
                        خصم مكتسب
                      </th>
                      <th class="p-2">
                        مرتجع
                      </th>
                      <th class="p-2">
                        مشتريات
                      </th>
                      <th class="p-2">
                        مبيعات
                      </th>
                      <th rowspan="1">
                        دفعات صادرة
                      </th>
                    </tr>
                    <tr v-if="fullReport">
                      <th class="p-2">
                        {{ totaldofaatWareda.toLocaleString() }}
                      </th>
                      <th class="p-2">
                        {{ totaltahdeen.toLocaleString() }}
                      </th>
                      <th class="p-2">
                        {{ totalkhasmMoktsb.toLocaleString() }}
                      </th>
                      <th class="p-2">
                        {{ totalmortgaa.toLocaleString() }}
                      </th>
                      <th class="p-2">
                        {{ totalmoshtryat.toLocaleString() }}
                      </th>
                      <th rowspan="1">
                        {{ totalMabiat.toLocaleString() }}
                      </th>
                      <th rowspan="1">
                        {{ totaldofaatSadera.toLocaleString() }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12" v-if="!fullReport">
      <v-card class="loader" height="650"> </v-card>
    </v-col>
    <v-col cols="12" class="show-data-clients">
      <template v-if="fullReport">
        <v-col cols="6" class="container-search-data-clients">
          <v-text-field
            class="not-print"
            v-model="searchClient"
            dense
            label="بحث عن عميل / بذرة"
            prepend-inner-icon="mdi-briefcase-search-outline"
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-data-table
          fixed-header
          :search="searchClient"
          :headers="headersName"
          :items="fullReport"
          :items-per-page="40"
          class="elevation-9 full-report"
        >
          <!-- <template v-slot:item.num="{ item }">
            <span
              >{{
                counter = fullReport.length ? counter++ : counter == 1
              }}19
            </span>
          </template> -->
          <template v-slot:item.dofaatWareda="{ item }">
            <span>{{ item.dofaatWareda }}</span>
          </template>
          <template v-slot:item.date="{ item }">
            <span>{{ new Date(item.date).toLocaleDateString("ar-EG") }}</span>
          </template>
          <template v-slot:item.clientBalance="{ item }">
            <span>{{ item.clientBalance.toLocaleString() }}</span>
          </template>
          <template v-slot:item.maden="{ item }">
            <span>{{ item.dofaatSadera.toLocaleString() }}</span>
          </template>
          <template v-slot:item.dayen="{ item }">
            <span>{{ item.moshtryat.toLocaleString() }}</span>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="ml-2"
              color="green darken-1"
              @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small color="red darken-1" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-results>
            لا يوجد بيانات
          </template>
        </v-data-table>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import Axios from "axios";
// import moment from "moment";
import { mapState } from "vuex";

export default {
  name: `reportclientbuyer`,
  data: () => ({
    from: null,
    end: null,
    editedIndexOrder: -1,
    balanceOpenIndex: -1,
    dialog: false,
    counter: 0,
    msg: "",
    showMsgSuc: false,
    msgError: false,
    pickerStart: new Date().toISOString().substr(0, 10),
    pickerEnd: new Date().toISOString().substr(0, 10),
    searchClient: "",
    pickerStartStemp: 0,
    pickerEndStemp: 0,
    // fullReport: null,
    showPickerStart: false,
    showPickerEnd: false,
    kmaia: 0,
    price: 0,
    order: {
      clientPhone: "",
      clientId: "",
      clientName: "",
      clientBalance: 0,
      seedName: "خس",
      seedId: 3,
      unit: "كيلو",
      type: "شراء",
      quantity: 5,
      sellingPrice: 10,
      buyingPrice: 0,
      haraka: "",
      dofaatSadera: 0,
      tahdeen: 0,
      khasmMoktsb: 0,
      mortgaa: 0,
      moshtryat: 0,
      dofaatWareda: 0,
    },
    headersName: [
      { text: "التاريخ ", value: "date", dataType: "Date", align: "center" },
      { text: "اسم العميل ", value: "clientName", align: "center" },
      { text: "رصيد ", value: "clientBalance", align: "center" },
      { text: "الحركة ", value: "haraka", align: "center" },
      { text: "اسم البذرة", value: "seedName", align: "center" },
      { text: "الكمية", value: "quantity", align: "center" },
      { text: "الوحدة", value: "unit", align: "center" },
      { text: "سعر الوحدة", value: "unitPrice", align: "center" },
      { text: "دفعات واردة", value: "dofaatWareda", align: "center" },
      { text: "دائن", value: "maden", align: "center" },
      { text: "مدين", value: "dayen", align: "center" },
      { text: "نوع الطلب", value: "type", align: "center" },
      { text: "التحكم", value: "action", sortable: false },
    ],
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.showMsg = false;
      this.msgAlert = false;
    }, 5000);
  },
  watch: {
    pickerStart() {
      this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
      // console.log(this.pickerStartStemp);
      this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
      let payload = {
        pickerStartStemp: this.pickerStartStemp,
        pickerEndStemp: this.pickerEndStemp,
        /* more parameters */
      };
      this.$store.dispatch("loadFullReport", payload);
    },
    pickerEnd() {
      this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
      this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
      // console.log(this.pickerStartStemp);
      let payload = {
        pickerStartStemp: this.pickerStartStemp,
        pickerEndStemp: this.pickerEndStemp,
        /* more parameters */
      };
      this.$store.dispatch("loadFullReport", payload);
    },
    kmaia() {
      this.order.moshtryat = this.kmaia * this.price;
      this.order.quantity = this.kmaia;
      this.order.buyingPrice = this.price;
    },
    // this to watch input if change  and change in input moshtryat

    price() {
      this.order.moshtryat = this.kmaia * this.price;
      this.order.quantity = this.kmaia;
      this.order.buyingPrice = this.price;
    },
  },
  computed: {
    startDate() {
      return this.date
        ? this.pickerStart.format("dd, MMM  YYYY 00:00:00 UTC")
        : "";
    },
    endDate() {
      return this.date
        ? this.pickerEnd.format("dd, MMM  YYYY 23:59:59 UTC")
        : "";
    },
    ...mapState(["fullReport"]),
    totaltahdeen: function() {
      // const sum = 0;
      return this.fullReport.reduce((sum = 0, item) => sum + item.tahdeen, 0);
    },
    totaldofaatSadera: function() {
      // const sum = 0;
      return this.fullReport.reduce(
        (sum = 0, item) => sum + item.dofaatSadera,
        0
      );
    },
    totalkhasmMoktsb: function() {
      // const sum = 0;
      return this.fullReport.reduce(
        (sum = 0, item) => sum + item.khasmMoktsb,
        0
      );
    },
    totalmortgaa: function() {
      // const sum = 0;
      return this.fullReport.reduce((sum = 0, item) => sum + item.mortgaa, 0);
    },
    totalMabiat: function() {
      // const sum = 0;
      return this.fullReport.reduce(function(sum = 0, item) {
        if (item.type == "بيع") return sum + item.moshtryat;
        else return sum;
      }, 0);
    },
    totalmoshtryat: function() {
      // const sum = 0;
      return this.fullReport.reduce(function(sum = 0, item) {
        if (item.type !== "بيع") return sum + item.moshtryat;
        else return sum;
      }, 0);
    },
    totaldofaatWareda: function() {
      // const sum = 0;
      return this.fullReport.reduce(
        (sum = 0, item) => sum + item.dofaatWareda,
        0
      );
    },
  },
  mounted() {
    this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
    this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
    let payload = {
      pickerStartStemp: this.pickerStartStemp,
      pickerEndStemp: this.pickerEndStemp,
      /* more parameters */
    };
    this.$store.dispatch("loadFullReport", payload);
  },
  methods: {
    print() {
      // Pass the element id here
      window.print();
    },
    editItem(item) {
      this.editedIndexOrder = this.fullReport.indexOf(item);
      this.order = Object.assign({}, item);
      this.dialog = true;
      this.kmaia = this.order.quantity;
      this.price = this.order.buyingPrice;
    },
    deleteItem(item) {
      var validate = prompt("  هل أنت متاكد من الحذف؟ ادخل كلمة السر");
      if (validate == window.sessionStorage.getItem("password")) {
        this.editedIndexOrder = this.fullReport.indexOf(item);
        this.order = Object.assign({}, item);
        Axios({
          method: "delete",
          url: `http://localhost:8087/api/deleteOrderById/${this.order.id}`,
          headers: { "content-type": "application/JSON" },
        })
          .then(() => {
            this.showMsgSuc = true;
            this.msg = "تم الحذف بنجاح";
            const index = this.fullReport.indexOf(item);
            this.fullReport.splice(index, 1);
          })
          .catch((err) => {
            var Console = console;
            Console.log(err);
          })
          .finally(() => (this.showMsgSuc = true));
      } else {
        this.msgError = true;
        this.msg = "كلمة السر غير صحيحة  لم يتم الحذف";
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.client = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      // console.log(this.order)
      Axios({
        method: "PUT",
        url: `http://localhost:8087/api/updateOrderById/${this.order.id}`,
        data: this.order,
        headers: { "content-type": "application/JSON" },
      })
        .then(() => {
          Object.assign(this.fullReport[this.editedIndexOrder], this.order);
          this.showMsgSuc = true;
          this.msg = "تم التعديل  بنجاح";
        })
        .catch((err) => {
          var Console = console;
          Console.log(err);
          this.msgError = true;
          this.msg = "لم يتم التعديل";
        });
      this.close();
    },
  },
};
</script>
