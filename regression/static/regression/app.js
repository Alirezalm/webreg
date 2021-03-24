const app = Vue.createApp({
    delimiters: ['[[', ']]'],

})

app.component('reg-form', {

    delimiters: ['[[', ']]'],
    template: '#register-form',

})

app.mount('#app')

