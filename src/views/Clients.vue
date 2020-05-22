<template>
  <v-row class="clients">
    <v-btn id="print-btn" color="#294964" class="mr-4" dark @click="print">
      <v-icon class="ml-2">mdi-printer</v-icon>
      طباعة
    </v-btn>
    <v-col cols="12">
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
      <!-- <v-alert
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
      </v-alert> -->
    </v-col>

    <v-col cols="12" class="text-center">
      <p class="display-1 line-after">
        العملاء
      </p>
    </v-col>
    <v-col cols="12" v-if="loading">
      <v-card class="loader" height="650">
        <v-progress-circular
          class="loader-circle"
          :size="80"
          :width="6"
          color="#294964"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-col>

    <v-col cols="12" class="show-data-clients">
      <template v-if="clients">
        <v-col cols="6" class="container-search-data-clients not-print">
          <v-text-field
            v-model="searchClient"
            label="بحث عن عميل "
            prepend-inner-icon="mdi-account-search"
            outlined
            dense
            clearable
          ></v-text-field>
        </v-col>
        <v-data-table
          :search="searchClient"
          :headers="headersName"
          :items="clients"
          :item-key="clients.id"
          :items-per-page="10"
          class="elevation-9"
        >
          <template v-slot:no-results>
            لا يوجد بيانات
          </template>
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="600px">
              <v-card class="add-client text-center">
                <div class="overlay"></div>

                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          dark
                          outlined
                          label="اسم العميل"
                          v-model="client.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          dark
                          outlined
                          type="number"
                          label="رقم التلفون"
                          v-model="client.phone"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          dark
                          outlined
                          label="الرصيد"
                          type="number"
                          v-model="client.balance"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
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
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn color="green darken-1" @click="save">حفظ</v-btn>
                  <v-btn color="info darken-1" @click="close">إلغاء</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        </v-data-table>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import Axios from "axios";
import { mapState } from "vuex";
export default {
  name: "clients",
  data: () => ({
    showMsg: false,
    typeAlert: "info",
    colorAlert: "red",
    msg: "",
    dialog: false,
    Client: "",
    searchClient: "",
    editedIndex: -1,
    client: {
      id: 0,
      name: "",
      balance: 0,
      type: "",
      phone: "",
    },
    defaultItem: null,
    headersName: [
      // { text: "الكود", value: "id", align: "right" },
      { text: "اسم ", value: "name", align: "right" },
      { text: "رقم التلفون ", value: "phone", align: "center" },
      { text: "رصيد", value: "balance", align: "center" },
      { text: "ملاحظات", value: "type", align: "center" },
      { text: "التحكم", value: "action", sortable: false },
    ],
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.msgError = false;
    }, 6000);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "" : "عرض العميل";
    },
    loading() {
      return this.$store.getters.loading;
    },
    ...mapState(["clients"]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    this.$store.dispatch("loadClients");
  },
  methods: {
    alertMsg(bool, color, msgs) {
      this.showMsg = bool;
      this.colorAlert = color;
      this.msg = msgs;
    },
    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.client = Object.assign({}, item);
      this.defaultItem = Object.assign({}, item);
      this.dialog = true;
      Axios({
        method: "PUT",
        url: `http://localhost:8087/api/updateClientById/${this.client.id}/${this.client}`,
        headers: { "content-type": "application/JSON" },
      }).then(() => {
        // this.showMsgSuc = true;
        // this.msg = "تم التعديل بنجاح";
        this.alertMsg(true,'green',"تم التعديل بنجاح");
      });
    },
    deleteItem(item) {
      var validate = prompt("  هل أنت متاكد من الحذف؟ ادخل كلمة السر");
      if (validate == sessionStorage.getItem("password")) {
        this.editedIndex = this.clients.indexOf(item);
        this.client = Object.assign({}, item);
        Axios({
          method: "delete",
          url: `http://localhost:8087/api/deleteClientById/${this.client.id}`,
          headers: { "content-type": "application/JSON" },
        })
          .then(() => {
        this.alertMsg(true,'green',"تم الحذف بنجاح");
            const index = this.clients.indexOf(item);
            this.clients.splice(index, 1);
          })
          .catch((err) => {
            var Console = console;
            Console.log(err);
          })
          .finally(() => (this.showMsgSuc = true));
      } else {
        this.alertMsg(true,'red',"كلمة السر غير صحيحة  لم يتم الحذف");
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
      Object.assign(this.clients[this.editedIndex], this.client);
      Axios({
        method: "PUT",
        url: `http://localhost:8087/api/updateClientById/${this.client.id}`,
        data: this.client,
        headers: { "content-type": "application/JSON" },
      })
        // Axios.post(`http://localhost:8087/api/updateClientByID`)
        .then(() => {
        this.alertMsg(true,'green',"تم التعديل بنجاح");
        })
        .catch((err) => {
          var Console = console;
          Console.log(err);
        });

      this.close();
    },

    print() {
      // Pass the element id here
      window.print();
    },
  },
};
</script>
