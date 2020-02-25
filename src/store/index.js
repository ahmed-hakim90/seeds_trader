import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("password") || "",
    login: false,
    error: null,
    success: null,
    navbar: false,
    user: null,
    clients: [],
    seeds: [],
    fullReport: [],
    accClient: [],
    reportSeed: [],
    loading: false
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_SUCCESS(state, payload) {
      state.success = payload;
    },
    CLEAR_SUCCESS(state) {
      state.success = null;
    },
    Toggle_NAV(state, navbar) {
      state.navbar = navbar;
    },
    SET_CLIENTS(state, clients) {
      state.clients = clients;
    },
    SET_SEEDS(state, seeds) {
      state.seeds = seeds;
    },
    SET_FULLREPORTS(state, fullReport) {
      state.fullReport = fullReport;
    },
    GET_ACCCLIENT(state, accClient) {
      state.accClient = accClient;
    },
    GET_REPORTSEED(state, reportSeed) {
      state.reportSeed = reportSeed;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    loadClients({ commit }) {
      let Console = console;
      commit("setLoading", true);

      Axios.get("http://localhost:8087/api/allClients")
        .then(res => {
          let clients = res.data;
          // Console.log(clients);
          commit("setLoading", false);
          commit("SET_CLIENTS", clients);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    loadSeeds({ commit }) {
      let Console = console;
      commit("setLoading", true);

      Axios.get("http://localhost:8087/api/allSeeds")
        .then(res => {
          let seeds = res.data;
          // Console.log(seeds);
          commit("SET_SEEDS", seeds);
          commit("setLoading", false);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    loadFullReport({ commit }, { pickerStartStemp, pickerEndStemp }) {
      let Console = console;
      Axios.get(
        `http://localhost:8087/api/fullOrderReport/${pickerStartStemp}/${pickerEndStemp}`
      )
        .then(res => {
          let fullReport = res.data;
          commit("SET_FULLREPORTS", fullReport);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    loadAccountClient({ commit }, { id, pickerStartStemp, pickerEndStemp }) {
      let Console = console;
      Axios.get(
        `http://localhost:8087/api/clientIdOrderReport/${id}/${pickerStartStemp}/${pickerEndStemp}`
      )
        .then(res => {
          let accClient = res.data;
          commit("GET_ACCCLIENT", accClient);
          // console.log(accClient);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    // ////////////////////////////////// to get report Seed
    loadReportSeed({ commit }, { id, pickerStartStemp, pickerEndStemp }) {
      let Console = console;
      Axios.get(
        `http://localhost:8087/api/seedIdOrderReport/${id}/${pickerStartStemp}/${pickerEndStemp}`
      )
        .then(res => {
          let reportSeed = res.data;
          commit("GET_REPORTSEED", reportSeed);
          // console.log(accClient);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    // saves  |||||||||||||||||||||||||||||||||||||||
    // saveOrder(payload) {
    //   let Order = {
    //     clientPhone: payload.clientPhone,
    //     clientId: payload.clientId,
    //     clientName: payload.clientName,
    //     clientBalance: payload.clientBalance,
    //     seedName: payload.seedName,
    //     seedId: payload.seedId,
    //     unit: payload.unit,
    //     note: payload.note,
    //     type: payload.type,
    //     quantity: payload.quantity,
    //     sellingPrice: payload.sellingPrice,
    //     buyingPrice: payload.buyingPrice,
    //     unitPrice: payload.unitPrice,
    //     haraka: payload.haraka,
    //     dofaatSadera: payload.dofaatSadera,
    //     tahdeen: payload.tahdeen,
    //     khasmMoktsb: payload.khasmMoktsb,
    //     mortgaa: payload.mortgaa,
    //     moshtryat: payload.moshtryat,
    //     dofaatWareda: payload.dofaatWareda
    //   };
    //   console.error(Order);
    //   Axios.post(`http://localhost:8087/api/saveOrder/${Order}`).then(
    //     result => {
    //       this.response = result.data;
    //     },
    //     error => {
    //       var Console = console;
    //       Console.error(error);
    //     }
    //   );
    // },
    //  to login from axios and save in session
    loginVuex({ commit }, payload) {
      Axios.get(
        `http://localhost:8087/api/validatePassword/${payload.password}`
      )
        .then(res => {
          let loginApi = res.data;
          if (loginApi) {
            window.sessionStorage.setItem(
              "password",
              JSON.stringify(payload.password)
            );
            commit("SET_USER", loginApi);
            commit("Toggle_NAV", true);
            commit("CLEAR_ERROR", false);
          } else {
            commit("SET_ERROR", "كلمة المرور غير صحيحة");
          }
        })
        .catch(err => {
          var Console = console;
          Console.log(err);
        });
    },
    //  to login  auto on password save in sesstion
    autoLogin({ commit }) {
      commit("SET_USER", true);
      commit("Toggle_NAV", true);
    },
    //  to sign out  delete password from  sesstion

    signOut({ commit }) {
      commit("SET_USER", false);
      commit("Toggle_NAV", false);
      sessionStorage.removeItem("password");
    }
  },
  // like computer to return data immeditaly on change
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    navbar(state) {
      return state.navbar;
    }
  },
  modules: {}
});
