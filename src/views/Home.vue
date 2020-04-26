<template>
  <v-container fluid>
    <div class=" overflow-hidden image-home"></div>

    <v-dialog v-model="dataBase" max-width="720px">
      <v-card class="text-center add-client">
        <div class="overlay"></div>
        <v-alert
          border="bottom"
          colored-border
          type="error"
          transition="leave-to-class"
          color="red"
          elevation="2"
          dismissible
          v-if="datas"
        >
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

    <v-row class="home-btn">
      <v-col cols="12">
  
<v-alert
          border="bottom"
          colored-border
          type="error"
          transition="leave-to-class"
          color="red"
          elevation="2"
          dismissible
          v-if="showMsg"
        >
          {{ msg }}
        </v-alert>
<v-alert
          border="bottom"
          colored-border
          type="success"
          transition="leave-to-class"
          color="cyan"
          elevation="2"
          dismissible
          v-if="showMsgSuc"
        >
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

      <v-col cols="12" sm="6" md="4" class="d-flex justify-space-around mt-12">
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
    </v-row>
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
    showMsgSuc: false,
  }),

  methods: {
    createBCApi() {
      if (this.createBC != "") {
        Axios.get(`http://localhost:8087/api/createBackup/${this.createBC}`)
          .then((res) => {
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
          .catch((err) => {
            var Console = console;
            Console.log(err);
          });
      } else {
        this.datas = true;
        this.msg = "اكتب كلمة السر";
      }
    },
    restoreBCApi() {
      if (this.restoreBC != "") {
        Axios.get(`http://localhost:8087/api/restoreBackup/${this.restoreBC}`)
          .then((res) => {
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
          .catch((err) => {
            var Console = console;
            Console.log(err);
          });
      } else {
        this.datas = true;
        this.msg = "اكتب كلمة السر";
      }
    },
  },
};
</script>
