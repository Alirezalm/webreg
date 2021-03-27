const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            isAuth: false

        }
    },
    mounted(){

        this.isAuth = Boolean(Number(document.getElementById('auth-id').innerText))
    }

})

app.component('reg-form', {

    delimiters: ['[[', ']]'],
    template: '#register-form',

    data() {
        return {
            userInfo: {},
            message: '',
            filledForm: false,
            url : '',

        }
    },
    // mounted() {
    //     this.url = 'http://127.0.0.1:8000/userauth'
    //     axios.get(this.url).then(res => {
    //         console.log(res)
    //     })
    // },
    methods: {
        register() {
            // document.getElementById('form-h41').innerText = `${this.userInfo.firstName} ${this.userInfo.lastName}!`
            // document.getElementById('form-h42').innerText = 'Thank you for your registration'
            this.filledForm = true
            const userJsonData = JSON.stringify(this.userInfo)
            console.log(userJsonData)
            this.url = 'http://127.0.0.1:8000/'
            axios.post(this.url, userJsonData).then(res => {

                console.log(res)
            })
        },

        validation(){
            if (this.userInfo.password !== this.userInfo.passwordRepeated){
                this.message = 'Passwords does not match. Try again'
                alert(this.message)
            }
            else{
                this.register()
            }
        }
    }

})

app.component('sign-in', {
    template: '#sign-in-form',
    delimiters: ['[[', ']]'],
})
app.mount('#app')

