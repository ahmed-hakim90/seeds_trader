<template>
  <v-container fluid>
    <div class=" overflow-hidden image-home"></div>

    <v-dialog v-model="dataBase" max-width="720px">
      <v-card class="text-center add-client">
        <div class="overlay"></div>
        <v-alert type="error" v-if="datas">
          {{ msg }}
        </v-alert>
        <v-card-title>
          <span class="headline">قاعدة البيانات</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="text-center">
              <v-col cols="8">
                <v-text-field
                  v-model="createBC"
                  label="انشاء نسخة احتياطية من قاعدة البيانات"
                  required
                  dark
                  type="password"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="green darken-1"
                  block
                  height="50"
                  @click="createBCApi"
                  >انشاء نسخة احتياطية</v-btn
                >
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="restoreBC"
                  type="password"
                  label="استعادة نسخة احتياطية من قاعدة البيانات"
                  required
                  dark
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="green darken-1"
                  block
                  height="50"
                  @click="restoreBCApi"
                  >استعادة نسخة احتياطية</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-dialog
      v-model="dialogReport"
      max-width="600px"
      overlay-opacity="0.1"
      overlay-color="#294964"
    >
      <v-card class="text-center add-client ">
        <div class="overlay" style="background-color:#29496498!important"></div>
        <v-card-title>
          <span class="headline">التقارير</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="text-center">
              <v-col cols="4" class="d-flex justify-space-start">
              <v-btn class="info"height="190" dark block to="/fullReport"
                  >تقرير شامل</v-btn
                > 
              </v-col>
               <v-col cols="4" class="d-flex justify-space-between">
                <v-btn
                  color="warning"
                  dark
                 height="190"
                  block
                  to="/accountclient"
                  >تقرير عميل</v-btn
                >
              </v-col>
              <v-col cols="4" class="d-flex justify-space-end">
                <v-btn color="warning" darkheight="190" block to="/seedReport"
                  >تقرير بذرة</v-btn
                >
              </v-col> 
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <!-- <v-dialog v-model="dialogForOrder" persistent max-width="800px">
      <v-card class="text-center add-client sell">
        <div class="overlay"></div>
        <v-form ref="form">
          <v-card-title>
            <span class="headline">عملية {{ Order.type }} </span>
          </v-card-title>
          <v-card-text>
            <div style="height:56px">
              <v-alert type="error" v-if="showMsg">
                {{ msg }}
              </v-alert>

              <v-alert
                type="success"
                color="green"
                text
                v-if="showSelect"
                dismissible
                transition="scroll-x-reverse-transition"
              >
                {{ msg }}
              </v-alert>
              <v-alert type="error" v-if="showMsg">
                {{ msg }}
              </v-alert>
              <v-alert type="success" v-if="showMsgSuc">
                {{ msg }}
              </v-alert>
            </div>
            <v-container>
              <v-row class="text-center">
                <v-col cols="7" class="top">
                  <v-text-field
                    label=" اسم العميل المختار"
                    v-model="clientSelected.name"
                    prepend-inner-icon="mdi-account"
                    dark
                    color="info"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-autocomplete
                    autofocus
                    :search-input.sync="searchdataApiClients"
                    :items="dataApiClients"
                    color="warning"
                    item-text="name"
                    dark
                    item-value="id"
                    label="اسم العميل"
                    outlined
                    clearable
                    single-line
                    placeholder="ابحث عن اسم عميل"
                    prepend-inner-icon="mdi-account-search"
                    return-object
                  >
                    <template v-slot:item="{ item, index }">
                      <v-list-item @click="getDataClient(item)">
                        <span>{{ item.name }}</span>
                      </v-list-item>
                    </template>

                    <template v-slot:no-results>
                      لا يوجد بيانات مطابقة
                    </template>
                    <template v-slot:no-data>
                      لا يوجد بيانات
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-row class="servey">
                  <v-col cols="7" class="top">
                    <v-text-field
                      label=" اسم البذرة المختار"
                      v-model="seedSelected.name"
                      prepend-inner-icon="mdi-account"
                      dark
                      color="info"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-autocomplete
                      :search-input.sync="searchdataApiSeeds"
                      :items="dataApiSeeds"
                      color="warning"
                      item-text="name"
                      dark
                      item-value="id"
                      label="اسم البذرة"
                      outlined
                      clearable
                      single-line
                      placeholder="ابحث عن اسم بذرة"
                      prepend-inner-icon="mdi-seed"
                      return-object
                    >
                      <template v-slot:item="{ item, index }">
                        <v-list-item @click="getDataSeed(item)">
                          <span>{{ item.name }}</span>
                        </v-list-item>
                      </template>

                      <template v-slot:no-results>
                        لا يوجد بيانات مطابقة
                      </template>
                      <template v-slot:no-data>
                        لا يوجد بيانات
                      </template>
                    </v-autocomplete>
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
                          label="سعر الشراء"
                          v-model="priceBuying"
                          v-if="buying"
                          suffix=" جنية "
                          type="number"
                          dark
                          outlined
                        ></v-text-field>
                        <v-text-field
                          label="سعر البيع"
                          v-if="selling"
                          v-model="priceSelling"
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
                      outlined
                      disabled
                      v-model="Order.unit"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="detail-cost">
                  <v-col cols="3"    v-if="buying">
                    <v-text-field
                      label="دفعات واردة"
                      v-model="Order.dofaatWareda"
                      type="number"
                   
                      dark
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2"   v-if="buying">
                    <v-text-field
                      label="تحضين"
                      v-model="Order.tahdeen"
                      type="number"
                      dark
                      outlined
                    
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3"  v-if="buying">
                    <v-text-field
                      label="خصم مكتسب"
                      v-model="Order.khasmMoktsb"
                      type="number"
                      dark
                     
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="مرتجع"
                      v-model="Order.mortgaa"
                      dark
                      outlined
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="detail-cost">
            
                  <v-col cols="3">
                    <v-text-field
                      label="دفعات صادرة"
                      v-model="Order.dofaatSadera"
                      type="number"
                      dark
                      
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field
                      label="مشتريات"
                      v-model="Order.moshtryat"
                      dark
                      disabled
                      type="number"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="all-cost">
                    <v-text-field
                      label="اجمالي التكلفة"
                      v-model="Order.moshtryat"
                      disabled
                      dark
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center ">
            <v-btn
              color="blue darken-1"
              min-width="130"
              height="50"
              @click="sandDataOrder"
              >حفظ</v-btn
            >
            <v-btn color="red darken-1" height="50" @click="closeDataOrder"
              >الغاء</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog> -->
    <v-row class="home-btn">
      <v-col cols="12">
        <v-alert type="error" v-if="showMsg">
          {{ msg }}
        </v-alert>
        <v-alert type="success" v-if="showMsgSuc">
          {{ msg }}
        </v-alert>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around">
        <v-btn
          class="elevation-10 headline"
          dark
          height="190"
          block
          to="/clients"
        >
          <v-icon class="ml-2">mdi-account-group</v-icon>
          العملاء
        </v-btn>
      </v-col>
      <!-- <v-col cols="12" sm="6" md="3" class="d-flex justify-space-around">
        <v-btn
          color="warning"
          class="elevation-10 headline"
          dark
         height="190"
          block
          to="/clients"
        >
          <v-icon class="ml-2">mdi-account-tie</v-icon>
          الموردين
        </v-btn>
      </v-col> -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around">
        <v-btn
          class="elevation-10 headline"
          dark
          height="190"
          block
          to="/seeds"
        >
          <v-icon class="ml-2">mdi-chart-bar-stacked</v-icon>

          الجرد</v-btn
        >
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around">
        <v-btn
          md="3"
          dark
          height="190"
          class="elevation-10 headline"
          block
          @click="dataBase = !dataBase"
        >
          <v-icon class="ml-2">mdi-database-lock</v-icon>
          قاعدة البيانات
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around mt-12">
        <v-btn
          class="elevation-10 headline"
          dark
          height="190"
          to="/accountclient"
          block
        >
          <v-icon class="ml-2">mdi-feature-search</v-icon>
          كشف حساب
        </v-btn>
      </v-col>
      <!-- <v-col cols="12" sm="6" md="3" class="d-flex justify-space-around mt-12">
         <v-btn
          color="warning"
          dark
          min-width="135"
         height="190"
          @click="dialogFormFive"
          block
        >
          <v-icon class="ml-2">mdi-cart-arrow-down</v-icon>

          عملية شراء
        </v-btn><v-btn
          color="warning"
          class="elevation-10 headline"
          dark
         height="190"
          block
          to="/accountclient"
        >
          <v-icon class="ml-2">mdi-account</v-icon>

          تقرير عميل
        </v-btn>
      </v-col> -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around mt-12">
        <!-- <v-btn
          color="warning"
          dark
          min-width="135"
         height="190"
          @click="dialogFormFour"
          block
        >
          <v-icon class="ml-2">mdi-cart-arrow-up</v-icon>
          عملية بيع
        </v-btn> -->
        <v-btn
          class="elevation-10 headline"
          dark
          height="190"
          block
          to="/seedReport"
        >
          <v-icon class="ml-2">mdi-seed</v-icon>

          تقرير بذرة
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around mt-12">
        <!-- <v-btn
          block
          color="warning"
          dark
          min-width="135"
         height="190"
          @click="dialogReport = !dialogReport"
        >
          <v-icon class="ml-2">mdi-file-chart</v-icon>
          التقارير
        </v-btn> -->
        <v-btn
          class=" elevation-10 headline"
          height="190"
          dark
          block
          to="/fullReport"
        >
          <v-icon class="ml-2">mdi-file-chart</v-icon>

          تقرير شامل
        </v-btn>
      </v-col>
      <!-- <v-btn
        class=" elevation-10 headline"
        height="190"
        dark
        block
        @click="deleteA"
      >
        <v-icon class="ml-2">mdi-file-chart</v-icon>

        Delete
      </v-btn> -->
    </v-row>
    <v-row>
      <!-- <v-img src="../assets/img/1354.svg"></v-img> -->
      <!-- <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="بحث عن عميل"
          outlined
          prepend-inner-icon="mdi-account-search"
          clearable
        ></v-text-field>
        <template v-if="dataApiClients && this.search != ''">
          <v-data-table
            disable-sort
            hide-default-footer
            :search="search"
            hide-default-header
            :headers="headersNameClients"
            :items="dataApiClients"
            :items-per-page="5"
            class="elevation-4"
          >
            <template v-slot:items="{ item }">

              {{ item.name }}
            </template>
            <template v-slot:no-results>
              لا يوجد بيانات
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="بحث عن بذرة"
          color="#296946"
          outlined
          prepend-inner-icon="mdi-seed"
          clearable
        ></v-text-field>
        <template v-if="dataApiSeeds && this.search != ''">
          <v-data-table
            disable-sort
            hide-default-footer
            :search="search"
            hide-default-header
            :headers="headersNameSeeds"
            :items="dataApiSeeds"
            :items-per-page="5"
            class="elevation-4"
          >
            <template v-slot:no-results>
              لا يوجد بيانات
            </template>
          </v-data-table>
        </template>
      </v-col> -->
    </v-row>
    <!-- <v-row class="mt-10">
      <v-col cols="12" md="6">
        <p class="display-1 main-color">
          <v-icon class="ml-2" color="#294964">mdi-account-group</v-icon>
          العملاء
        </p>
        <template v-if="dataApiClients">
          <v-data-table
            disable-sort
            hide-default-footer
            :headers="headersNameClients"
            :items="dataApiClients"
            item-key="item.id"
            single-select
            :items-per-page="10"
            class="elevation-4"
          >
            <template v-slot:no-results>
              لا يوجد بيانات
            </template>
          </v-data-table>
        </template>
      </v-col>

      <v-col cols="12" md="6">
        <p class="display-1 main-color">
          <v-icon class="ml-2" color="#294964">mdi-seed</v-icon>

          البذور
        </p>

        <template v-if="dataApiSeeds">
          <v-data-table
            disable-sort
            hide-default-footer
            :headers="headersNameSeeds"
            :items="dataApiSeeds"
            item-key="item.id"
            single-select
            :items-per-page="10"
            class="elevation-4"
          >
            <template v-slot:no-results>
              لا يوجد بيانات
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
import Axios from "axios";
export default {
  name: "home",
  data: () => ({
    // this vars for databases
    datas: false,
    dataBase: false,
    createBC: "",
    restoreBC: "",
    msg: "",
    passData: null,
    showMsg: false,
    showMsgSuc: false
    // search: "",
    // dialogReport: false,
    // dialogForOrder: false,
    // tableClient: false,
    // tableSeed: false,
    // dataApiClients: null,
    // dataApiSeeds: null,
    // kmaia: null,
    // to select client
    // showSelect: false,
    // clientSelect: null,
    // selectedClient: false,
    // searchdataApiClients: "",
    // clientIndex: -1,
    // to select seed
    // searchdataApiSeeds: "",
    // seedIndex: -1
    // headersNameClients: [
    //   { text: "اسم العميل", value: "name" },
    //   { text: "رقم التلفون", value: "phone" }
    // ],
    // headersNameSeeds: [
    //   { text: "اسم البذرة", value: "name" },
    //   { text: "سعر البيع ", value: "sellingPrice" }
    // ],
    // priceBuying: null,
    // priceSelling: null,
    // selling: false,
    // buying: false,
    // Order: {
    //   clientPhone: "",
    //   clientId: "",
    //   clientName: "",
    //   clientBalance: 0,
    //   seedName: "خس",
    //   seedId: 3,
    //   unit: "كيلو",
    //   type: "شراء",
    //   quantity: 5,
    //   sellingPrice: 10,
    //   buyingPrice: 0,
    //   haraka: "",
    //   dofaatSadera: null,
    //   tahdeen: null,
    //   khasmMoktsb: null,
    //   mortgaa: null,
    //   moshtryat: null,
    //   dofaatWareda: null
    // },
    // client: {
    //   name: "",
    //   phone: "",
    //   type: "",
    //   balance: 0
    // },
    // seed: {
    //   name: "",
    //   unit: "",
    //   sellingPrice: null,
    //   buyingPrice: null,
    //   quantity: 0,
    //   soldQuantity: 0
    // },
    // clientSelected: {
    //   id: 0,
    //   name: "",
    //   balance: 0,
    //   type: "",
    //   phone: ""
    // },
    // seedSelected: {
    //   name: "",
    //   unit: "",
    //   sellingPrice: 0,
    //   buyingPrice: 0,
    //   quantity: 0,
    //   soldQuantity: 0
    // }
  }),
  created() {
    // setInterval(() => {
    //   this.showMsgSuc = false;
    //   this.showMsg = false;
    //   this.msgAlert = false;
    //   this.datas = false;
    // }, 8000);
    // setInterval(() => {
    //   this.showSelect = false;
    // }, 3000);
  },
  watch: {
    // kmaia() {
    //   this.Order.quantity = this.kmaia;
    //   if (this.selling) {
    //     this.Order.sellingPrice = this.priceSelling;
    //     this.Order.moshtryat = this.kmaia * this.priceSelling;
    //   }
    //   if (this.buying) {
    //     this.Order.buyingPrice = this.priceBuying;
    //     this.Order.moshtryat = this.kmaia * this.priceBuying;
    //   }
    // },
    // this to watch input if change  and change in input moshtryat
    // priceSelling() {
    //   this.Order.moshtryat = this.kmaia * this.priceSelling;
    //   this.Order.quantity = this.kmaia;
    //   this.Order.sellingPrice = this.priceSelling;
    // },
    // priceBuying() {
    //   this.Order.moshtryat = this.kmaia * this.priceBuying;
    //   this.Order.quantity = this.kmaia;
    //   this.Order.buyingPrice = this.priceBuying;
    // }
  },
  methods: {
    createBCApi() {
      if (this.createBC != "") {
        Axios.get(`http://localhost:8087/api/createBackup/${this.createBC}`)
          .then(res => {
            this.passData = res.data;
            if (this.passData != "رقم سري خاطئ") {
              this.showMsgSuc = true;
              this.dataBase = false;
              this.createBC = null;

              this.msg = "تم انشاء نسخة احتياطية من البيانات";
            } else {
              this.showMsg = true;
              this.msg = "كلمة المرور الخاصة بقاعدة البيانات غير صحيحة";
            }
          })
          .catch(err => {
            var Console = console;
            Console.log(err);
          });
      } else {
        this.datas = true;
        this.msg = "اكتب كلمة السر";
      }
    },
    deleteA() {
      Axios.delete(
        "http://localhost:8087/api/deleteAllDatabaseWithoutUsersTable"
      );
    },
    restoreBCApi() {
      if (this.restoreBC != "") {
        Axios.get(`http://localhost:8087/api/restoreBackup/${this.restoreBC}`)
          .then(res => {
            this.passData = res.data;
            if (this.passData == "نجحت عملية استرجاع البيانات") {
              this.showMsgSuc = true;
              this.dataBase = false;
              this.restoreBC = null;
              this.msg = "تم استرجاع نسخة احتياطية من البيانات";
            } else {
              this.showMsg = true;
              this.msg = "كلمة المرور الخاصة بقاعدة البيانات غير صحيحة";
            }
          })
          .catch(err => {
            var Console = console;
            Console.log(err);
          });
      } else {
        this.datas = true;
        this.msg = "اكتب كلمة السر";
      }
    }
  }
};
</script>
