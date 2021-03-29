const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data() {
        return {
            isAuth: false,
            url: '',
            userLogin: ''

        }
    },
    mounted() {

        this.isAuth = Boolean(Number(document.getElementById('auth-id').innerText))
        // this.onLogout()
    },
    methods: {
        loginDone(userLogin) {
            this.userLogin = userLogin
            this.isAuth = true

        },
        onLogout() {
            this.url = 'https://onreg.herokuapp.com/logout'
            axios.get(this.url).then(res => {
                this.isAuth = false
            })
        }
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
            url: '',

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
            this.url = 'https://onreg.herokuapp.com'
            axios.post(this.url, userJsonData).then(res => {

                console.log(res)
            })
        },

        validation() {
            if (this.userInfo.password !== this.userInfo.passwordRepeated) {
                this.message = 'Passwords does not match. Try again'
                alert(this.message)
            } else {
                this.register()
            }
        }
    }

})

app.component('sign-in', {
    template: '#sign-in-form',
    delimiters: ['[[', ']]'],
    data() {
        return {
            userLogin: {},
            url: ''
        }
    },
    methods: {
        onLogin() {
            this.url = 'https://onreg.herokuapp.com/login/'
            axios.post(this.url, JSON.stringify(this.userLogin)).then(res => {
                console.log(res.data)
                this.$emit('login-done', this.userLogin)
            })


        }
    }
})

app.component('dashboard', {
    template: '#dashboard',
    delimiters: ['[[', ']]'],
    data() {
        return {
            problem: {},
            url: '',
            solution: []
        }
    },
    methods: {
        onSolve() {
            this.url = 'https://onreg.herokuapp.com/regression/'
            axios.post(this.url, JSON.stringify(this.problem)).then(res => {
                this.solution.push(res.data['solution'])
                console.log(this.solution.length)
            })
        }
    }

})
app.mount('#app')

