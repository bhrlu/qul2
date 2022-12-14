import { defineStore } from "pinia";
import { Loading, LocalStorage } from "quasar";
import { api } from "boot/axios";
import { COUNTRY_CODE } from "src/base-url";

export const useMainStore = defineStore("main", {
  state: () => ({
    countries: [],
    token: LocalStorage.getItem('token') || null
  }),
  getters: {},
  actions: {
    // async getData() {
    //   // Loading.show()
    //   try{
    //     const { data } = await api.get(COUNTRY_CODE.countryCode)
    //     console.log(data)
    //     // Loading.hide()
    //   }
    //   catch(err){
    //     console.log(err)
    //   }
    // },
    setToken(token) {
      LocalStorage.set('token', token)
      this.token = token
    },

    getData() {
      Loading.show();
      api.get(COUNTRY_CODE.countryCode)
      .then(res=>{
        this.countries = res.data
        console.log(res)
        Loading.hide();
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
});
