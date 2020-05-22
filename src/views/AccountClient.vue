<template>
  <v-container fluid>
    <v-dialog v-model="loading" max-width="1000">
      hi
    </v-dialog>
    <v-row>
      <!-- this is special to print btn -->
      <v-btn id="print-btn" color="#294964" class="mr-4" dark @click="print">
        <v-icon class="ml-2">mdi-printer</v-icon>
        طباعة
      </v-btn>
      <!-- this is to alert in data not send -->
      <v-alert
        type="info"
        :color="colorAlert"
        v-if="showMsg"
        border="bottom"
        colored-border
        transition="leave-to-class"
        elevation="2"
        dismissible
      >
        {{ msg }}
      </v-alert>
      <!-- when data send  -->

      <v-col cols="12" class="text-center">
        <!-- title page heading -->
        <p class="display-1 line-after">
          كشف حساب عميل
        </p>
      </v-col>

      <v-col cols="4" class="not-print">
        <v-autocomplete
          @click="searchClientAccount"
          autofocus
          :items="clients"
          color="warning"
          item-text="name"
          item-value="id"
          single-line
          label="اسم العميل"
          outlined
          return-object
          placeholder="ابحث عن اسم عميل"
          prepend-inner-icon="mdi-account-search"
        >
          <template v-slot:item="{ item }">
            <div
              class="v-list-item v-list-item--link theme--light"
              @click="getDataClientToAcc(item)"
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
        <v-btn
          color="#294964"
          dark
          block
          min-height="55"
          @click="showReportClient"
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
                <v-icon>mdi-account</v-icon>
                {{ clientSelectedToAcc.name }} / {{ clientSelectedToAcc.type }}
              </v-card-title>

              <span>
                <v-icon class="mr-4">mdi-calendar</v-icon>
                التاريخ</span
              >
              <span>
                من

                {{ new Date(pickerStart).toLocaleDateString() }}
              </span>
              <span> / </span>
              <span>
                الي
                {{ new Date(pickerEnd).toLocaleDateString() }}
              </span>
            </div>
            <v-col cols="6" class="padding-0">
              <div
                class="left-side-card d-flex justify-end"
                v-if="
                  clientSelectedToAcc.type == 'مشتري' ||
                    clientSelectedToAcc.type == 'مشترى'
                "
              >
                <table>
                  <tbody>
                    <tr>
                      <th class="p-2">
                        دفعات واردة دائن
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
                        مبيعات
                      </th>
                      <th rowspan="1">
                        دفعات صادرة مدين
                      </th>
                    </tr>
                    <tr v-if="accClient">
                      <th class="p-2">
                        {{ totaldofaatWareda }}
                      </th>
                      <th class="p-2">
                        {{ totaltahdeen }}
                      </th>
                      <th class="p-2">
                        {{ totalkhasmMoktsb }}
                      </th>
                      <th class="p-2">
                        {{ totalmortgaa }}
                      </th>
                      <th class="p-2">
                        {{ totalmoshtryat }}
                      </th>
                      <th rowspan="1">
                        {{ totaldofaatSadera }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="left-side-card d-flex justify-end"
                v-else-if="clientSelectedToAcc.type == 'مورد'"
              >
                <table>
                  <tbody>
                    <tr>
                      <th rowspan="1">
                        دائن دفعات صادرة
                      </th>
                      <th class="p-2">
                        خصم مكتسب
                      </th>
                      <th class="p-2">
                        مدين دفعات واردة
                      </th>

                      <th class="p-2">
                        مشتريات
                      </th>
                    </tr>
                    <tr v-if="accClient">
                      <th rowspan="1">
                        {{ totaldofaatSadera }}
                      </th>
                      <th class="p-2">
                        {{ totalkhasmMoktsb }}
                      </th>
                      <th class="p-2">
                        {{ totaldofaatWareda }}
                      </th>

                      <th class="p-2">
                        {{ totalmoshtryat }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-col>
          </div>
        </v-card>
      </v-col>

      <v-alert
        v-if="!clientSelectedToAcc.id"
        border="bottom"
        colored-border
        type="error"
        transition="leave-to-class"
        color="red"
        elevation="2"
        dismissible
        style="z-index:1"
      >
        برجاء ادخل البيانات لاظهار التقرير
      </v-alert>
      <v-col
        cols="12"
        class="show-data-clients"
        v-if="clientSelectedToAcc.type == 'مورد'"
      >
        <template v-if="clientSelectedToAcc.id">
          <v-data-table
            :search="searchClient"
            :headers="headersNameMo"
            :items="accClient"
            :items-per-page="10"
            class="elevation-9"
            hide-no-results
            hide-no-data
          >
            <template v-slot:no-results>
              <div class="text-center" style="color: #294964">
                لا يوجد بيانات مطابقة
              </div>
            </template>

            <template v-slot:item.date="{ item }">
              <span>{{ new Date(item.date).toLocaleDateString("ar-EG") }}</span>
            </template>

            <template v-slot:item.moshtryat="{ item }">
              <span>{{ item.moshtryat + item.dofaatWareda }}</span>
            </template>

            <template v-slot:item.madenMo="{ item }">
              <span>{{ item.dofaatSadera }}</span>
            </template>

            <template v-slot:item.dayenMo="{ item }">
              <span>
                {{ item.dofaatWareda + item.moshtryat }}
              </span>
            </template>
            <template v-slot:item.quantity="{ item }">
              <span>{{ item.quantity }}</span>
            </template>
            <template v-slot:item.unitPrice="{ item }">
              <span>{{ item.unitPrice }}</span>
            </template>
            <template v-slot:item.clientBalance="{ item }">
              <span>{{ item.clientBalance }}</span>
            </template>
            <template v-if="addOrder" v-slot:body.prepend>
              <tr class="input-add-order not-print">
                <td>
                  {{ date.toLocaleDateString("ar-EG") }}
                </td>
                <td>
                  <v-text-field
                    type="text"
                    placholder="نوع الحركة"
                    hide-details
                    outlined
                    v-model="Order.haraka"
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-select
                    v-model="typeOrderWatch"
                    :items="typeOrder"
                    hide-details
                    outlined
                    dense
                  ></v-select>
                </td>
                <td>
                  <v-autocomplete
                    ref="resetElement"
                    dense
                    @click="searchseeds"
                    item-value="id"
                    :items="seeds"
                    color="warning"
                    item-text="name"
                    label="اسم البذرة"
                    outlined
                    single-line
                    hide-details
                    placeholder="بحث البذرة"
                    prepend-inner-icon="mdi-seed"
                    return-object
                  >
                    <template v-slot:item="{ item }">
                      <div
                        class="v-list-item v-list-item--link theme--light"
                        @click="getDataSeed(item)"
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
                </td>
                <td>
                  <v-text-field
                    type="number"
                    hide-details
                    outlined
                    v-model="kmaia"
                    :error="hasQuNot"
                    dense
                  ></v-text-field>
                </td>

                <td>
                  <v-text-field
                    type="text"
                    label="الوحدة"
                    hide-details
                    outlined
                    dense
                    clearable
                    v-model="Order.unit"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    type="number"
                    placholder="123"
                    hide-details
                    v-if="buying"
                    outlined
                    v-model="priceBuying"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-if="selling"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    v-model="priceSelling"
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="Order.dofaatWareda"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="Order.dofaatSadera"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </td>

                <td>
                  <span v-if="buying">
                    {{ totalCostBuying }}
                  </span>
                  <span v-if="selling">
                    {{ totalCostSelling }}
                  </span>
                </td>

                <td>
                  {{ Order.clientBalance }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>

      <v-col
        cols="12"
        class="show-data-clients"
        v-if="
          clientSelectedToAcc.type == 'مشتري' ||
            clientSelectedToAcc.type == 'مشترى'
        "
      >
        <template v-if="clientSelectedToAcc.id">
          <v-data-table
            :search="searchClient"
            :headers="headersNameSh"
            :items="accClient"
            :items-per-page="10"
            class="elevation-9"
            hide-no-results
            hide-no-data
          >
            <template v-slot:no-results>
              <div class="text-center" style="color: #294964">
                لا يوجد بيانات مطابقة
              </div>
            </template>

            <template v-slot:item.date="{ item }">
              <span>{{ new Date(item.date).toLocaleDateString("ar-EG") }}</span>
            </template>

            <template v-slot:item.moshtryat="{ item }">
              <span>{{ item.moshtryat + item.dofaatWareda }}</span>
            </template>
            <template v-slot:item.madenSh="{ item }">
              <span>{{ item.moshtryat + item.dofaatSadera }}</span>
            </template>

            <template v-slot:item.dayenSh="{ item }">
              <span>
                {{
                  item.tahdeen +
                    item.dofaatWareda +
                    item.mortgaa +
                    item.khasmMoktsb
                }}
              </span>
            </template>

            <template v-slot:item.quantity="{ item }">
              <span>{{ item.quantity }}</span>
            </template>
            <template v-slot:item.unitPrice="{ item }">
              <span>{{ item.unitPrice }}</span>
            </template>
            <template v-slot:item.clientBalance="{ item }">
              <span>{{ item.clientBalance }}</span>
            </template>
            <template v-if="addOrder" v-slot:body.prepend>
              <tr class="input-add-order not-print">
                <td>
                  {{ date.toLocaleDateString("ar-EG") }}
                </td>
                <td>
                  <v-text-field
                    type="text"
                    placholder="نوع الحركة"
                    hide-details
                    outlined
                    v-model="Order.haraka"
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-select
                    v-model="typeOrderWatch"
                    :items="typeOrder"
                    hide-details
                    outlined
                    dense
                  ></v-select>
                </td>
                <td>
                  <v-autocomplete
                    ref="resetElement"
                    dense
                    @click="searchseeds"
                    :search-input.sync="searchInput"
                    :items="seeds"
                    color="warning"
                    item-text="name"
                    item-value="id"
                    label="اسم البذرة"
                    outlined
                    single-line
                    hide-details
                    placeholder="بحث البذرة"
                    prepend-inner-icon="mdi-seed"
                    return-object
                  >
                    <template v-slot:item="{ item }">
                      <div
                        class="v-list-item v-list-item--link theme--light"
                        @click="getDataSeed(item)"
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
                </td>
                <td>
                  <v-text-field
                    type="number"
                    hide-details
                    outlined
                    v-model="kmaia"
                    :error="hasQuNot"
                    dense
                  ></v-text-field>
                </td>

                <td>
                  <v-text-field
                    type="text"
                    label="الوحدة"
                    hide-details
                    outlined
                    dense
                    clearable
                    v-model="Order.unit"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    type="number"
                    placholder="123"
                    hide-details
                    v-if="buying"
                    outlined
                    v-model="priceBuying"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-if="selling"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    v-model="priceSelling"
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="Order.dofaatWareda"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="Order.dofaatSadera"
                    type="number"
                    placholder="123"
                    hide-details
                    outlined
                    dense
                  ></v-text-field>
                </td>

                <td>
                  <span v-if="buying">
                    {{ totalCostBuying ? totalCostBuying : totalCostBuying }}
                  </span>
                  <span v-if="selling">
                    {{ totalCostSelling ? totalCostSelling : totalCostSelling }}
                  </span>
                </td>

                <td>
                  {{ Order.clientBalance }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
    <div class="not-print" v-if="notShow">
      <v-speed-dial
        v-model="fab"
        bottom="bottom"
        right="right"
        direction="top"
        fixed
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            color="blue darken-4"
            v-model="fab"
            @click="makeOpenTextArea"
            dark
            fixed
            bottom
            right
            fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-btn @click="closeOrder" fab dark color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          :disabled="loading"
          @click="sandDataOrder"
          fab
          dark
          color="green"
        >
          <v-icon>mdi-content-save-move</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
  </v-container>
</template>
<script>
// import Axios from "axios";
import { mapState } from "vuex";
// import moment from "moment";
export default {
  name: "accountclient",
  data: () => ({
     showMsg: false,
    colorAlert: "red",
    msg: "",
    searchInput: "",
    notShow: false,
    hasQuNot: false,
   
    // to select Seed
    selectForSeed: null,
    seedIndex: -1,
    typeOrderWatch: "",
    selling: true,
    buying: false,
    kmaia: null,
    priceSelling: null,
    priceBuying: null,
    totalCostBuying: null,
    totalCostSelling: null,
    seed: {
      name: null,
      unit: "",
      id: null,
      sellingPrice: null,
      buyingPrice: null,
      quantity: 0,
      soldQuantity: 0,
    },
    addOrder: false,
    date: new Date(),
    fab: false,
    afterSelect: false,
    msgAlert: "",
    alartAppSuc: false,
    alartApp: false,
    // clients: null,
    searchClient: "",
    select: null,
    clientSelectedToAcc: {
      id: false,
      name: "",
      balance: 0,
      type: "",
      phone: "",
    },
    Order: {
      clientPhone: "",
      clientId: "",
      clientName: "",
      clientBalance: 0,
      seedName: "خس",
      seedId: null,
      unit: "",
      note: "",
      type: "",
      quantity: null,
      sellingPrice: 0,
      buyingPrice: 0,
      unitPrice: 0,
      haraka: "",
      dofaatSadera: null,
      tahdeen: 0,
      khasmMoktsb: 0,
      mortgaa: 0,
      moshtryat: 0,
      dofaatWareda: null,
    },
    typeOrder: ["بيع", "شراء", "غير محدد"],
    selectedClientToAcc: null,
    showPickerStart: false,
    showPickerEnd: false,
    pickerStart: new Date().toISOString().substr(0, 10),
    pickerEnd: new Date().toISOString().substr(0, 10),
    pickerStartStemp: 0,
    pickerEndStemp: 0,
    clientIndexToAcc: -1,
    headersNameMo: [
      { text: "التاريخ ", value: "date", dataType: "Date", align: "center" },
      { text: "الحركة ", value: "haraka", align: "center" },
      { text: "نوع الطلب", value: "type", align: "center" },
      { text: "اسم البذرة", value: "seedName", align: "center" },
      { text: "الكمية", value: "quantity", align: "center" },
      { text: "الوحدة", value: "unit", align: "center" },
      { text: "سعر ", value: "unitPrice", align: "center" },
      { text: "  دفعة واردة مدين ", value: "dayenMo", align: "center" },
      { text: "  دفعة صادرة دائن ", value: "madenMo", align: "center" },
      //  { text: "دفعة واردة مدين", value: "dayenSh", align: "center" },
      //  { text: "دفعة صادرة دائن", value: "madenSh", align: "center" },
      { text: "تكلفة الطلب", value: "moshtryat", align: "center" },
      { text: "رصيد ", value: "clientBalance", align: "center" },
    ],
    headersNameSh: [
      { text: "التاريخ ", value: "date", dataType: "Date", align: "center" },
      { text: "الحركة ", value: "haraka", align: "center" },
      { text: "نوع الطلب", value: "type", align: "center" },
      { text: "اسم البذرة", value: "seedName", align: "center" },
      { text: "الكمية", value: "quantity", align: "center" },
      { text: "الوحدة", value: "unit", align: "center" },
      { text: "سعر ", value: "unitPrice", align: "center" },
      { text: "دفعة واردة دائن", value: "dayenSh", align: "center" },
      { text: "دفعة صادرة  مدين", value: "madenSh", align: "center" },
      { text: "تكلفة الطلب", value: "moshtryat", align: "center" },
      { text: "رصيد ", value: "clientBalance", align: "center" },
    ],
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.showMsg = false;
      this.alertApp = false;
      this.alartAppSuc = false;
    }, 6000);
    setTimeout(() => {
      this.searchClientAccount();
      this.searchseeds();
    }, 100);
  },
  watch: {
    // this to on change in input select client call function to show data for this client
    selectedClientToAcc() {
      this.showReportClient();
    },
    // this is to on change in input amount to * price  = total cost
    kmaia() {
      // to
      this.Order.quantity = this.kmaia;

      this.Order.sellingPrice = this.priceSelling;
      this.totalCostSelling = (this.kmaia * this.priceSelling).toLocaleString();

      this.Order.buyingPrice = this.priceBuying;
      this.totalCostBuying = this.kmaia * this.priceBuying;
      // console.log(this.Order);

      if (this.Order.type == "بيع") {
        if (this.kmaia > this.seed.quantity) {
          this.hasQuNot = true;
        } else {
          this.hasQuNot = false;
        }
      } else {
        this.hasQuNot = false;
      }
    },

    // this to watch input if change  and change in input moshtryat

    // this is to on change in input amount to * price  = total cost
    priceSelling() {
      this.totalCostSelling = (this.kmaia * this.priceSelling).toLocaleString();

      this.Order.sellingPrice = this.priceSelling;
    },
    priceBuying() {
      this.totalCostBuying = (this.kmaia * this.priceBuying).toLocaleString();
      this.Order.buyingPrice = this.priceBuying;
      //  if(this.Order.type == "شراء"){
      //   this.Order.dofaatWareda = this.totalCostBuying * -1;
      // }
    },
    typeOrderWatch: function() {
      if (this.typeOrderWatch == "بيع") {
        this.Order.type = this.typeOrderWatch;
        this.selling = true;
        this.buying = false;
        // console.log(this.Order.type);
      }
      if (this.typeOrderWatch == "شراء") {
        this.Order.type = this.typeOrderWatch;
        this.selling = false;
        this.buying = true;
        this.hasQuNot = false;
        this.alartApp = false;
        // console.log(this.Order.type);
      } else {
        this.Order.type = this.typeOrderWatch;
        // console.log(this.Order.type);
      }
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
    },
  },
  computed: {
    ...mapState(["accClient", "clients", "seeds"]),
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
    totaltahdeen: function() {
      // const sum = 0;
      return this.accClient.reduce((sum = 0, item) => sum + item.tahdeen, 0);
    },
    totaldofaatSadera: function() {
      // const sum = 0;
      return this.accClient.reduce(
        (sum = 0, item) => sum + item.dofaatSadera,
        0
      );
    },
    totalkhasmMoktsb: function() {
      // const sum = 0;
      return this.accClient.reduce(
        (sum = 0, item) => sum + item.khasmMoktsb,
        0
      );
    },
    totalmortgaa: function() {
      // const sum = 0;
      return this.accClient.reduce((sum = 0, item) => sum + item.mortgaa, 0);
    },
    totalmoshtryat: function() {
      // const sum = 0;
      return this.accClient.reduce((sum = 0, item) => sum + item.moshtryat, 0);
    },
    totaldofaatWareda: function() {
      // const sum = 0;
      return this.accClient.reduce(
        (sum = 0, item) => sum + item.dofaatWareda,
        0
      );
    },
  },
  mounted() {
    this.pickerStartStemp = Date.parse(`${this.pickerStart} 00:00:00 `);
    this.pickerEndStemp = Date.parse(`${this.pickerEnd} 23:59:59`);
  },
  methods: {
    alertMsg(bool, color, msgs) {
      this.showMsg = bool;
      this.colorAlert = color;
      this.msg = msgs;
    },
    searchseeds() {
      this.$store.dispatch("loadSeeds");
    },
    searchClientAccount() {
      this.$store.dispatch("loadClients");
    },
    getDataClientToAcc(item) {
      this.notShow = true;
      // this to get data selected from api for specific client
      this.clientIndexToAcc = this.clients.indexOf(item);
      this.clientSelectedToAcc = Object.assign({}, item);
      Object.assign(
        this.clients[this.clientIndexToAcc],
        this.clientSelectedToAcc
      );
      // console.log(this.clientSelectedToAcc)
      this.Order.clientPhone = this.clientSelectedToAcc.phone;
      this.Order.clientId = this.clientSelectedToAcc.id;
      this.Order.clientName = this.clientSelectedToAcc.name;
      this.Order.clientBalance = this.clientSelectedToAcc.balance;
      // this to assign  variables  from get api to vars to post api

      //this to hide table after select client in perparing order
      this.showReportClient();
    },
    getDataSeed(item) {
      // this to get data selected from api for specific client

      this.seedIndex = this.seeds.indexOf(item);
      this.seed = Object.assign({}, item);
      Object.assign(this.seeds[this.seedIndex], this.seed);
      // this to assign data after change by perparer order

      // this.seed.priceBuying = this.priceBuying;
      // this.seed.priceSelling = this.priceSelling;
      this.priceBuying = this.seed.buyingPrice;
      this.priceSelling = this.seed.sellingPrice;
      // this to assign  variables  from get api to vars to post api
      this.Order.quantity = this.kmaia;
      this.Order.seedName = this.seed.name;
      this.Order.unit = this.seed.unit;
      this.Order.sellingPrice = this.seed.sellingPrice;
      this.Order.buyingPrice = this.seed.buyingPrice;
      this.Order.seedId = this.seed.id;
      //this to hide table after select client in perparing order
      // this.showSelect = true;
      // this.msg = "تم اختيار البذرة";
      if (this.Order.type == "بيع") {
        if (this.seed.quantity == 0) {
          this.hasQuNot = true;
          this.alertMsg(true,'blue',"قم بشراء البذرة اولاً لان لا يوجد كمية متوفرة");
        } else {
          this.hasQuNot = false;
          this.alertMsg(false);

        }
      } else {
        this.hasQuNot = false;
              this.alertMsg(false);
      }
    },
    showReportClient() {
      // this.balanceOpen = Object.assign({}, -1);
      // Object.assign(this.balanceOpen, this.dataApiFullReport[22]);
      if (this.clientSelectedToAcc.id != 0) {
          this.alertMsg(true,'green',"تم تحديث البيانات");
        this.afterSelect = true;
        let payload = {
          id: this.clientSelectedToAcc.id,
          pickerStartStemp: this.pickerStartStemp,
          pickerEndStemp: this.pickerEndStemp,
          /* more parameters */
        };
        this.$store.dispatch("loadAccountClient", payload);
      } else {
          this.alertMsg(true,'green',"برجاء اختيار العميل!!");
      }
    },
    sandDataOrder() {
      if (this.Order.quantity == "") {
        this.Order.quantity = 0;
      }
      if (this.Order.quantity == null) {
        this.Order.quantity = 0;
      }

      if (this.Order.dofaatWareda == null) {
        this.Order.dofaatWareda = 0;
      }
      if (this.Order.dofaatSadera == null) {
        this.Order.dofaatSadera = 0;
      }
      if (
        this.Order.seedName != "" &&
        this.seed.id != null &&
        this.Order.quantity != null
      ) {
        if (!this.hasQuNot) {
          this.$store.dispatch("saveOrder", { Order: this.Order });
        }
        setTimeout(() => {
          if (this.$store.getters.success) {
            this.reset();
            this.showReportClient();
            this.$store.getters.success = false;
          }
        }, 1250);
        // this.reset();
      } else {
          this.alertMsg(true,'blue',"برجاء اختيار بذرة");

      }
    },
    print() {
      window.print();
    },

    makeOpenTextArea() {
      if (this.accClient) {
        this.addOrder = true;
      } else {
          this.alertMsg(true,'blue',"برجاء اختيار العميل!!");
      }
    },
    reset() {
      this.seed.name = null;
      this.seed.id = null;
      this.Order.seedId = null;
      this.Order.seedName = null;
      this.Order.dofaatSadera = null;
      this.warda = null;
      this.kmaia = null;
      this.priceBuying = null;
      this.priceSelling = null;
      this.Order.unit = "";
      this.Order.note = "";
      this.typeOrderWatch = null;
      this.Order.quantity = null;
      this.Order.sellingPrice = null;
      this.Order.buyingPrice = null;
      this.Order.unitPrice = null;
      this.Order.haraka = "";
      this.Order.tahdeen = 0;
      this.Order.khasmMoktsb = 0;
      this.Order.mortgaa = 0;
      this.Order.moshtryat = 0;
      this.Order.dofaatWareda = null;
      this.$refs.resetElement.reset();
    },
    closeOrder() {
      this.reset();
      this.addOrder = false;
    },
  },
};
</script>
