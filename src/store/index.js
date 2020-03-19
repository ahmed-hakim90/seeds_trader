import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // token: localStorage.getItem("password") || "",
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
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    loadClients({ commit }) {
      let Console = console;
      commit("SET_LOADING", true);

      Axios.get("http://localhost:8087/api/allClients")
        .then(res => {
          let clients = res.data;
          // Console.log(clients);
          commit("SET_LOADING", false);
          commit("SET_CLIENTS", clients);
        })
        .catch(err => {
          Console.log(err);
        });
    },
    loadSeeds({ commit }) {
      let Console = console;
      commit("SET_LOADING", true);

      Axios.get("http://localhost:8087/api/allSeeds")
        .then(res => {
          let seeds = res.data;
          // Console.log(seeds);
          commit("SET_SEEDS", seeds);
          commit("SET_LOADING", false);
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
    saveOrder({ commit }, { Order }) {
      commit("SET_LOADING", true);
      commit("SET_SUCCESS", false);
      Axios({
        method: "POST",
        url: "http://localhost:8087/api/saveOrder",
        data: Order,
        headers: { "Content-Type": "application/json" }
      })
        .then(
          result => {
            this.response = result.data;
            commit("CLEAR_ERROR", true);
            // commit("SET_SUCCESS", true);
            commit("SET_SUCCESS", true);

            // dispatch("loadAccountClient");
          },
          error => {
            var Console = console;
            Console.error(error);
          }
        )
        .finally(() => {
          setTimeout(() => {
            commit("SET_SUCCESS", false);
          }, 2200);

          commit("SET_LOADING", false);
        });
    },
    saveSeed({ commit }, { seed }) {
      Axios({
        method: "POST",
        url: "http://localhost:8087/api/saveSeed",
        data: seed,
        headers: { "Content-Type": "application/json" }
      }).then(
        result => {
          this.response = result.status;

          commit("CLEAR_ERROR", true);
          commit("SET_SUCCESS", true);

          // commit("loadAccountClient");
        },
        error => {
          var Console = console;
          Console.error(error);
        }
      );
    },
    saveClient({ commit }, { client }) {
      Axios({
        method: "POST",
        url: "http://localhost:8087/api/saveClient",
        data: client,
        headers: { "Content-Type": "application/json" }
      })
        .then(
          result => {
            this.response = result.data;
            commit("CLEAR_ERROR", true);
            commit("SET_SUCCESS", true);
            // commit("loadAccountClient");
          },
          error => {
            var Console = console;
            Console.error(error);
          }
        )
        .finally(() => {
          setTimeout(() => {
            commit("SET_SUCCESS", false);
          }, 2200);

          commit("SET_LOADING", false);
        });
    },
    //  to login from axios and save in session
    loginVuex({ commit }, payload) {
      Axios.get(
        `http://localhost:8087/api/validatePassword/${payload.password}`
      )
        .then(res => {
          let loginApi = res.data;
          if (loginApi) {
            window.sessionStorage.setItem("password", payload.password);
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
    success(state) {
      return state.success;
    },
    navbar(state) {
      return state.navbar;
    }
  }
});
