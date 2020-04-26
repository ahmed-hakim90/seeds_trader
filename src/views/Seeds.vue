<template>
  <v-row class="clients">
    <v-btn id="print-btn" color="#294964" class="mr-4" dark @click="print">
      <v-icon class="ml-2">mdi-printer</v-icon>
      طباعة
    </v-btn>
    <v-col cols="12">

         <v-alert
        v-if="showMsgSuc"
        border="bottom"
        colored-border
        type="success"
        transition="leave-to-class"
        color="cyan"
        elevation="2"
        dismissible
       
      >
       {{ msg }}
      </v-alert>
          <v-alert
        v-if="msgError"
        border="bottom"
        colored-border
        type="error"
        transition="leave-to-class"
        color="red"
        elevation="2"
        dismissible
       
      >
        {{ msg }}
      </v-alert>

    </v-col>
    <v-col cols="12" class="text-center">
      <p class="display-1 line-after">البذور</p>
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
      <template>
        <v-col cols="6" class="container-search-data-clients">
          <v-text-field
            dense
            class="not-print"
            v-model="searchSeeds"
            label="بحث عن بذرة"
            solo
            clearable
          ></v-text-field>
        </v-col>
        <v-data-table
          :search="searchSeeds"
          :headers="headersName"
          :items="seeds"
          :item-key="seeds.id"
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
                  <span class="headline">{{ formTitle }} </span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            dark
                            outlined
                            label="اسم البذرة"
                            v-model="seed.name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            dark
                            type="number"
                            outlined
                            label="    الكمية الحالية"
                            v-model="seed.quantity"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dark
                            type="number"
                            outlined
                            label="    الكمية المباعة"
                            v-model="seed.soldQuantity"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            dark
                            type="number"
                            outlined
                            label="    الكمية المشترى"
                            v-model="seed.boughtQuantity"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dark
                            outlined
                            type="number"
                            label="سعر البيع"
                            v-model="seed.sellingPrice"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dark
                            outlined
                            type="number"
                            label="سعر الشراء"
                            v-model="seed.buyingPrice"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn color="green darken-1" @click="save">حفظ</v-btn>
                  <v-btn color="info darken-1" @click="close">الغاء</v-btn>
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
  name: "accountclient",
  data: () => ({
    msg: "",
    msgError: false,

    searchSeeds: "",
    showMsgSuc: false,
    dialog: false,
    editedIndex: -1,
    seed: {
      id: null,
      name: "",
      sellingPrice: "",
      buyingPrice: "",
      soldQuantity: "",
      quantity: ""
    },
    defaultItem: null,
    headersName: [
      // { text: "كود", value: "id" },
      { text: "اسم ", value: "name" },
      { text: "الوحدة ", value: "unit" },
      { text: " الكمية الحالية", value: "quantity" },
      { text: "الكمية المباعة", value: "soldQuantity" },
      { text: "الكمية المشترى", value: "boughtQuantity" },
      { text: "سعر شراء", value: "sellingPrice" },
      { text: "سعر بيع", value: "buyingPrice" },
      { text: "التحكم", value: "action", sortable: false }
    ]
  }),
  created() {
    setInterval(() => {
      this.showMsgSuc = false;
      this.msgError = false;
    }, 6000);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "" : "عرض البذرة";
    },
    loading() {
      return this.$store.getters.loading;
    },
    ...mapState(["seeds"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.$store.dispatch("loadSeeds");
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.seeds.indexOf(item);
      this.seed = Object.assign({}, item);
      this.defaultItem = Object.assign({}, item);
      this.dialog = true;
      // Axios({
      //     method: "PUT",
      //     url: `http://localhost:8087/api/updateSeedById/${this.seed.id}/${this.seed}`,
      //     headers: { "content-type": "application/JSON" }
      //   })
      //   .then(() => {
      //       this.showMsgSuc = true;
      //       this.msg = "تم التعديل بنجاح";
      //     })
    },
    deleteItem(item) {
      var validate = prompt("  هل أنت متاكد من الحذف؟ ادخل كلمة السر");
      if (validate == sessionStorage.getItem("password")) {
        this.editedIndex = this.seeds.indexOf(item);
        this.seed = Object.assign({}, item);
        Axios({
          method: "delete",
          url: `http://localhost:8087/api/deleteSeedById/${this.seed.id}`,
          headers: { "content-type": "application/JSON" }
        })
          .then(() => {
            this.showMsgSuc = true;
            this.msg = "تم الحذف بنجاح";
            const index = this.seeds.indexOf(item);
            this.seeds.splice(index, 1);
          })
          .catch(err => {
            var Console = console;
            Console.log(err);
          })
          .finally(() => (this.showMsgSuc = true));
      } else {
        this.msgError = true;
        this.msg = " كلمة السر غير صحيحة  لم يتم الحذف";
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.seed = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.seeds[this.editedIndex], this.seed);
        Axios({
          method: "PUT",
          url: `http://localhost:8087/api/updateSeedById/${this.seed.id}`,
          data: this.seed,
          headers: { "content-type": "application/JSON" }
        })
          .then(() => {
            this.showMsgSuc = true;
            this.msg = "تم التعديل بنجاح";
          })
          .catch(err => {
            var Console = console;
            Console.log(err);
          });
      } else {
        this.seeds.push(this.seed);
      }
      this.close();
    },

    print() {
      // Pass the element id here
      window.print();
      this.print = true;
    }
  }
};
</script>
