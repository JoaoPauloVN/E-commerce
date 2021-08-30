<template>
    <div class="address">
        <h2><i class="fas fa-map-marked-alt"></i> Novo Endereço</h2>
        <div class="address_wrapper">
            <div class="form_wrapper w66">
                <label for="inputAddress" id="labelAddress">Endereço</label>
                <input type="text" id="inputAddress"  v-model="address" @focus="inputFocus('Address')" @blur="inputBlur('Address')">
            </div>
            <div class="form_wrapper w33">
                <label for="inputNumber" id="labelNumber">Numero</label>
                <input type="text" id="inputNumber" v-model="number" @focus="inputFocus('Number')" @blur="inputBlur('Number')">
            </div>
            <div class="form_wrapper w50">
                <label for="inputDistrict" id="labelDistrict">Bairro</label>
                <input type="text" id="inputDistrict" v-model="district" @focus="inputFocus('District')" @blur="inputBlur('District')">
            </div>
            <div class="form_wrapper w50">
                <label for="inputCity" id="labelCity">Cidade</label>
                <input type="text" id="inputCity" v-model="city" @focus="inputFocus('City')" @blur="inputBlur('City')">
            </div>
            <div class="form_wrapper w50">
                <label for="inputState" id="labelState">Estado</label>
                <input type="text" id="inputState" v-model="state" @focus="inputFocus('State')" @blur="inputBlur('State')">
            </div>
            <div class="form_wrapper w50">
                <label for="inputCEP" id="labelCEP">CEP</label>
                <input type="text" id="inputCEP" v-model="CEP" @focus="inputFocus('CEP')" @blur="inputBlur('CEP')">
            </div>
            <div class="form_wrapper w50">
                <label for="inputPhone" id="labelPhone">Telefone</label>
                <input type="text" id="inputPhone" v-model="phone" @focus="inputFocus('Phone')" @blur="inputBlur('Phone')">
            </div>
        </div>
        <button @click.stop.prevent="NewAddress">Salvar Endereço</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'NewUserAddress',
    data() {
        return {
           address: '',
           number: '',
           district: '',
           city: '',
           state: '',
           CEP: '',
           phone: ''
        }
    },
    methods: {
        inputFocus: function(field) {
            let label = document.querySelector('#label'+field)
            label.classList.add('active')
        },
        inputBlur: function(field) {
            let label = document.querySelector('#label'+field)
            let input = document.querySelector('#input'+field)
            if(input.value != 0)
                label.classList.add('active')
            else 
                label.classList.remove('active')
        },
        NewAddress() {
            const id = this.$store.state.user.id
            const payload = {
                "address": [{
                    "address": this.address,
                    "number": this.num,
                    "district": this.district,
                    "city": this.city,
                    "state": this.state,
                    "CEP": this.CEP,
                    "phone": this.phone
                }]        
            }
            let errors = []
            for(const v in payload.address[0]) {
                let a = v.charAt(0).toUpperCase() + v.slice(1)
                let el = document.querySelector('#input'+a)
                el.style.border = '1px solid gray'
                if(payload.address[0][v] == '') {
                    el.style.border = "2px solid red"
                    errors.push(v)
                }
            }
            if(errors.length == 0) {
                axios.patch(`/users/${id}`, payload)
                .then(()=> {
                    this.$store.dispatch('getUserLogged')
                    this.$router.push('/user/endereco')
                })
            }
            
        }
    }
}
</script>   

<style lang="scss" scoped>
    .address {
        padding-bottom: 20px;
        i {
            font-size: 18px;
        }
        h2 {
            font-size: 20px;
            color: rgb(57,57,57);
            margin-bottom: 10px;
        }
        button {
            padding: 10px;
            border-radius: 5px;
            border: none;
            outline: none;        
            padding: 12px 15px;
            box-shadow: 0 7px 15px -6px rgba(57, 57, 57, .5);
            cursor: pointer;
            background: rgb(255, 115, 0);  
            font-weight: 500;
            color: white;
            font-size: 16px;   
            margin-top: 10px;
            &:hover {
                text-decoration: underline;
            }
        }
        .address_wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
           .form_wrapper {
                width: 100%;
                position: relative;
                margin: 5px 0;
                input {
                    padding: 12px 10px;
                    width: 100%;
                    font-size: 15px;
                    border-radius: 5px;
                    border: 1px solid rgb(57,57,57);
                    outline: none;
                    color: rgb(57,57,57);
                }
                label {
                    position: absolute;
                    background: rgb(255, 255, 255);
                    display: inline-block;
                    top: 12px;
                    left: 10px;
                    transition: all 200ms;
                    padding: 0 4px;
                    color: rgb(67,67,67);
                    &.active {
                        top: 0;
                        transform: translate(-5px, -10px) scale(.8)
                    }
                }
                &.w50 {
                    width: 49.5%;
                }
                &.w66 {
                    width: 66%;
                }
                &.w33 {
                    width: 33%;
                }
            } 
        }      
    }
</style>