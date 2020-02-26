<template>
  <v-app>
    <v-navigation-drawer
      v-if="navVisibility"
      fixed
      app
      expand-on-hover
      left
      permanent
      dark
      width="250"
      height="100%"
      src="./assets/img/close-up-photography-of-green-leafed-plant-1214394.jpg"
    >
      <div class="overlay"></div>
      <v-list-item class="container-top-im-he">
        <v-list-item-icon>
          <v-icon class="mr-2" large>mdi-seed</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <!-- <v-list-item-title class="display-1"> نماء للبذور</v-list-item-title> -->
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav class="text-center">
        <v-list-item
          v-for="(item, i) in menuNav"
          :key="i"
          :to="item.link"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||   -->
        <v-list-item @click="dialogFormOne">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>اضافة عميل</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="dialogFormTwo">
          <v-list-item-icon>
            <v-icon>mdi-seed</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>اضافة بذرة</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="dialogFormFour">
          <v-list-item-icon>
            <v-icon>mdi-cart-arrow-up</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>عملية بيع</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="dialogFormFive">
          <v-list-item-icon>
            <v-icon>mdi-cart-arrow-down</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>عملية شراء</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="authSignout = true">
          <v-list-item-icon>
            <v-icon>mdi-account-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>تسجيل الخروج</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-alert
          type="success"
          dismissible
          close-text="Close Alert"
          v-if="showMsgSuc"
        >
          تم الاضافة بنجاح
        </v-alert>
        <v-dialog
          v-model="authSignout"
          persistent
          max-width="600px"
          overlay-opacity="0.44"
          overlay-color="#294964"
        >
          <v-card class="text-center add-client">
            <div class="overlay"></div>
            <v-card-title>
              <span class="headline">تسجيل الخروج</span>
            </v-card-title>
            <v-card-actions class="justify-center ">
              <v-btn
                color="red darken-1"
                min-width="130"
                height="50"
                @click="signout"
                >تسجيل الخروج</v-btn
              >
              <v-btn
                color=" green darken-1"
                min-width="130"
                height="50"
                @click="authSignout = false"
                >الغاء</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogFormClient" persistent max-width="600px">
          <v-card class="text-center add-client">
            <div class="overlay"></div>
            <v-alert type="error" v-if="showMsg">
              برجاء ادخل البيانات كاملة
            </v-alert>
            <v-form ref="form">
              <v-card-title>
                <span class="headline">اضافة عميل جديد</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-text-field
                        v-model="client.name"
                        label="اسم العميل*"
                        required
                        dark
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client.phone"
                        label="رقم التلفون*"
                        required
                        dark
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="client.balance"
                        label="رصيد "
                        type="number"
                        required
                        dark
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-card width="250" class="bg-radio-btn">
                      <v-radio-group v-model="client.type">
                        <v-radio
                          label="عميل مورد"
                          color="success"
                          value="مورد"
                        ></v-radio>
                        <v-radio
                          label="عميل مشتري"
                          color="success"
                          value="مشتري"
                        ></v-radio>
                      </v-radio-group>
                    </v-card>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-center ">
                <v-btn
                  color="blue darken-1"
                  min-width="130"
                  height="50"
                  :disabled="isLoadingBtn"
                  @click="sandDataClient"
                  >حفظ</v-btn
                >
                <v-btn
                  color="red darken-1"
                  height="50"
                  @click="closeDialogClient"
                  >الغاء</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- }||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| Add Seed New In DB start -->
        <v-dialog v-model="dialogFormSeed" persistent max-width="600px">
          <v-card class="text-center add-client">
            <div class="overlay"></div>
            <v-alert type="error" v-if="showMsg">
              برجاء ادخل البيانات كاملة
            </v-alert>
            <v-form ref="form">
              <v-card-title>
                <span class="headline">اضافة بذرة جديد</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-text-field
                        label="اسم البذرة*"
                        required
                        dark
                        outlined
                        prepend-inner-icon="mdi-seed"
                        v-model="seed.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="سعر بيع"
                        prefix="جنية"
                        dark
                        outlined
                        type="number"
                        v-model="seed.sellingPrice"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="سعر شراء"
                        prefix="جنية"
                        dark
                        outlined
                        type="number"
                        v-model="seed.buyingPrice"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="seed.unit"
                        label="الوحدة"
                        dark
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="justify-center ">
                <v-btn
                  color="blue darken-1"
                  min-width="130"
                  height="50"
                  :disabled="isLoadingBtn"
                  @click="sandDataSeed"
                  >حفظ</v-btn
                >
                <v-btn
                  color="red darken-1"
                  height="50"
                  @click="dialogFormSeed = false"
                  >الغاء</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <!-- }||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| Add Seed New In DB ended -->

        <!-- }||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| Add Buying Order New In DB start -->

        <v-dialog v-model="dialogForOrder" persistent max-width="800px">
          <v-card class="text-center add-client sell">
            <div class="overlay"></div>
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
            <v-form ref="form">
              <v-card-title>
                <span class="headline">عملية {{ Order.type }} </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row class="text-center">
                    <v-col cols="10">
                      <v-autocomplete
                        v-model="selectForClient"
                        autofocus
                        @click="searchclients"
                        :items="clients"
                        :loading="loading"
                        color="warning"
                        item-text="name"
                        dark
                        item-value="id"
                        label="اسم العميل"
                        outlined
                        single-line
                        placeholder="ابحث عن اسم عميل"
                        prepend-inner-icon="mdi-account-search"
                        return-object
                      >
                        <template v-slot:item="{ item, index }">
                          <div
                            class="v-list-item v-list-item--link theme--light"
                            @click="getDataClient(item)"
                          >
                            {{ item.name }}
                          </div>
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
                      <v-col cols="10">
                        <v-autocomplete
                          v-model="selectForSeed"
                          @click="searchseeds"
                          :items="seeds"
                          :loading="loading"
                          color="warning"
                          item-text="name"
                          dark
                          item-value="id"
                          label="اسم البذرة"
                          outlined
                          single-line
                          placeholder="ابحث عن اسم بذرة"
                          prepend-inner-icon="mdi-seed"
                          return-object
                        >
                          <template v-slot:item="{ item, index }">
                            <div
                              class="v-list-item v-list-item--link theme--light"
                              @click="getDataSeed(item)"
                            >
                              {{ item.name }}
                            </div>
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
                          type="number"
                          dark
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          label="سعر"
                          v-model="priceBuying"
                          v-if="buying"
                          type="number"
                          suffix=" جنية شراء"
                          dark
                          outlined
                        ></v-text-field>
                        <v-text-field
                          label="سعر "
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
                          label="الوحدة"
                          dark
                          outlined
                          disabled
                          v-model="Order.unit"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="detail-cost">
                      <v-col cols="3" v-if="buying">
                        <v-text-field
                          label="دفعات واردة"
                          v-model="Order.dofaatWareda"
                          type="number"
                          dark
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2" v-if="buying">
                        <v-text-field
                          label="تحضين"
                          v-model="Order.tahdeen"
                          type="number"
                          dark
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3" v-if="buying">
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
                      <!-- <span class="caption  font-weight-bold-"> مدين </span> -->
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
        </v-dialog>

        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Axios from "axios";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    // HelloWorld
  },

  data: () => ({
    passData: null,
    restoreBC: "",
    kmaia: null,
    priceBuying: null,
    priceSelling: null,
    showMsg: false,
    showMsgSuc: false,
    authSignout: false,
    showOne: false,
    showThree: false,
    dialogFormClient: false,
    dialogFormSeed: false,
    dialogForOrder: false,
    // isLoading: true,
    isLoadingBtn: false,
    // to select client
    selectForClient: null,
    clientSelect: null,
    selectedClient: false,
    // searchclients: "",
    clientIndex: -1,
    // to select seed
    showSelect: false,
    selectForSeed: null,
    seedIndex: -1,
    // this is client to assign  data from api
    selling: false,
    buying: false,
    // this is client
    client: {
      name: "",
      phone: "",
      type: "",
      balance: null
    },
    // this is seed to assign  data from api

    seed: {
      name: "",
      unit: "",
      sellingPrice: null,
      buyingPrice: null,
      quantity: 0,
      soldQuantity: 0
    },
    // this is order to send  data for api
    Order: {
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
      dofaatSadera: null,
      tahdeen: null,
      khasmMoktsb: null,
      mortgaa: null,
      moshtryat: null,
      dofaatWareda: null
    },
    //  this is left side menu
    menuNav: [
      {
        title: "الصفحة الرئيسية",
        icon: "mdi-home-city-outline",
        link: "/"
      },
      { title: "المخزن", icon: "mdi-cactus", link: "/seeds" },
      {
        title: " تقرير شامل",
        icon: "mdi-file-chart",
        link: "/fullReport"
      },
      {
        title: "كشف حساب",
        icon: "mdi-feature-search",
        link: "/accountclient"
      },
      {
        title: "تقرير بذرة",
        icon: "mdi-seed",
        link: "/seedReport"
      }
    ],
    // to assign client selected = for client in order
    clientSelected: {
      id: 0,
      name: "",
      balance: 0,
      type: "",
      phone: ""
    },
    // to assign seed selected = for seed in order
    seedSelected: {
      name: "",
      unit: "",
      sellingPrice: 0,
      buyingPrice: 0,
      quantity: 0,
      soldQuantity: 0
    }
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.showMsg = false;
      this.msgAlert = false;
      this.showSelect = false;
    }, 8000);
    setInterval(() => {
      this.showSelect = false;
    }, 3000);
  },
  computed: {
    ...mapState(["clients", "seeds"]),
    loading() {
      return this.$store.getters.loading;
    },
    navVisibility() {
      return this.$store.getters.navbar;
    }
  },
  watch: {
    // this to watch input if change  and change in input moshtryat
    kmaia() {
      this.Order.quantity = this.kmaia;
      if (this.selling) {
        this.Order.sellingPrice = this.priceSelling;
        this.Order.moshtryat = this.kmaia * this.priceSelling;
      }
      if (this.buying) {
        this.Order.buyingPrice = this.priceBuying;
        this.Order.moshtryat = this.kmaia * this.priceBuying;
      }
    },
    // this to watch input if change  and change in input moshtryat

    priceSelling() {
      this.Order.moshtryat = this.kmaia * this.priceSelling;
      this.Order.quantity = this.kmaia;
      this.Order.sellingPrice = this.priceSelling;
    },
    priceBuying() {
      this.Order.moshtryat = this.kmaia * this.priceBuying;
      this.Order.quantity = this.kmaia;
      this.Order.buyingPrice = this.priceBuying;
    }
  },

  methods: {
    searchclients() {
      this.$store.dispatch("loadClients");
    },
    searchseeds() {
      this.$store.dispatch("loadSeeds");
    },
    // this is to send data  client in api for save in DB
    sandDataClient() {
      if (
        this.client.name != "" &&
        this.client.phone != "" &&
        this.client.type != "" &&
        this.client.balance != ""
      ) {
        this.$store.dispatch("saveClient", { client: this.client });
        this.isLoadingBtn = true;
        this.showMsgSuc = true;
        this.showOne = false;
        this.dialogFormClient = false;
        this.isLoadingBtn = false;
        this.searchclients();
      } else {
        this.showMsg = true;
        this.isLoadingBtn = false;
        this.msg = "برجاء ادخال البيانات كاملة!";
      }
    },
    // this is to send data  seed in api for save in DB

    sandDataSeed() {
      this.isLoadingBtn = true;
      if (
        this.seed.name != "" &&
        this.seed.sellingPrice != null &&
        this.seed.unit != "" &&
        this.seed.buyingPrice != null
      ) {
        this.$store.dispatch("saveSeed", { seed: this.seed });
        this.isLoading = false;
        this.showMsgSuc = true;
        this.showOne = false;
        this.dialogFormSeed = false;
        this.isLoadingBtn = false;
        this.searchseeds();
      } else {
        this.showMsg = true;
        this.isLoadingBtn = false;
      }
    },

    // to get client data in perparing order
    getDataClient(item) {
      // this to get data selected from api for specific client
      this.clientIndex = this.clients.indexOf(item);
      this.clientSelected = Object.assign({}, item);
      Object.assign(this.clients[this.clientIndex], this.clientSelected);
      // this to assign  variables  from get api to vars to post api
      this.selectedClient = true;
      this.Order.clientPhone = this.clientSelected.phone;
      this.Order.clientId = this.clientSelected.id;
      this.Order.clientName = this.clientSelected.name;
      this.Order.clientBalance = this.clientSelected.balance;
      this.showSelect = true;
      this.msg = "تم اختيار العميل";
      //this to hide table after select client in perparing order
    },

    // to get seed data in perparing order
    getDataSeed(item) {
      // this to get data selected from api for specific client
      this.seedIndex = this.seeds.indexOf(item);
      this.seedSelected = Object.assign({}, item);
      Object.assign(this.seeds[this.seedIndex], this.seedSelected);
      // this to assign data after change by perparer order
      this.kmaia = this.seedSelected.quantity;
      this.priceBuying = this.seedSelected.buyingPrice;
      this.priceSelling = this.seedSelected.sellingPrice;
      // this to assign  variables  from get api to vars to post api
      this.Order.quantity = this.kmaia;
      this.Order.seedName = this.seedSelected.name;
      this.Order.unit = this.seedSelected.unit;
      this.Order.sellingPrice = this.seedSelected.sellingPrice;
      this.Order.buyingPrice = this.seedSelected.buyingPrice;
      this.Order.seedId = this.seedSelected.id;
      //this to hide table after select client in perparing order
      this.showSelect = true;
      this.msg = "تم اختيار البذرة";
    },

    // to send data in api to save it in DB
    sandDataOrder() {
      if (this.Order.dofaatWareda == null) {
        this.Order.dofaatWareda = 0;
      }
      if (this.Order.dofaatSadera == null) {
        this.Order.dofaatSadera = 0;
      }
      if (this.Order.tahdeen == null) {
        this.Order.tahdeen = 0;
      }
      if (this.Order.khasmMoktsb == null) {
        this.Order.khasmMoktsb = 0;
      }
      if (this.Order.mortgaa == null) {
        this.Order.mortgaa = 0;
      }
      if (this.Order.moshtryat == null) {
        this.Order.moshtryat = 0;
      }
      if (this.Order.dofaatWareda == null) {
        this.Order.dofaatWareda = 0;
      }
      if (this.Order.clientName != "" && this.Order.seedName != "") {
        this.$store.dispatch("saveOrder", { Order: this.Order });

        this.isLoading = false;
        this.showMsgSuc = true;
        this.showOne = false;
        this.dialogForOrder = false;
      } else {
        this.showMsg = true;
      }
    },
    signout() {
      this.authSignout = false;
      this.$store.dispatch("signOut");
      this.$router.replace("/login");
    },
    dialogFormOne() {
      this.dialogFormClient = true;
      this.showOne = false;
    },
    dialogFormTwo() {
      this.dialogFormSeed = true;
      this.showOne = false;
    },
    dialogFormFour() {
      this.Order.type = "بيع";
      (this.buying = true),
        (this.selling = false),
        (this.dialogForOrder = true);
      this.showThree = false;
    },
    dialogFormFive() {
      this.Order.type = "شراء";
      (this.selling = true),
        (this.buying = false),
        (this.dialogForOrder = true);
      this.showThree = false;
    },

    closeDialogClient() {
      this.dialogFormClient = false;
      this.showMsg = false;
      this.reset();
    },
    closeDataOrder() {
      this.dialogForOrder = false;
      this.showMsg = false;
      this.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    restoreBCApi() {
      var validate = prompt("ادخل كلمة السر لإعادة البيانات");
      Axios.get(`http://localhost:8087/api/restoreBackup/${validate}`)
        .then(res => {
          this.passData = res.data;
          this.showMsgSuc = true;
        })
        .catch(err => {
          var Console = console;
          Console.log(err);
        });
    }
  }
};
</script>
