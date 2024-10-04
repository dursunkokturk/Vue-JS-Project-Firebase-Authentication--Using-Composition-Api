<template>
    <div class="row justify-content-center">
        <div class="col-md-6">

            <!-- Register Degiskenine Atanan Deger 
                True Olursa Ekranda Kayıt Formu Gorunecek 
                False Olursa Ekranda Kullanici Girisi Formu Gorunecek -->
            <h1 class="text-center">
                {{register ? 'Kayıt Formu': 'Kullanıcı Girişi'}}
            </h1>

            <!-- Her Karakter Girme Isleminde Sayfa Yenileme Yapilmasin Diye
                prevent Attribute Kullaniyoruz -->
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label">E-Mail</label>

                    <!-- formData Degiskenine Atanan Obje Icindeki Attribute Ile Baglanti Kuruyoruz -->
                    <input type="email" v-model="formData.email" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Şifre</label>

                    <!-- formData Degiskenine Atanan Obje Icindeki Attribute Ile Baglanti Kuruyoruz -->
                    <input type="password" v-model="formData.password" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary btn-lg">
                    {{register ? 'Kayıt Ol': 'Giriş Yap'}}
                </button>
            </form>
            <hr/>
            <button class="btn btn-outline-primary btn-lg" @click="register=!register">
                    {{register ? 'Giriş Yap' : 'Kayıt Ol'}}
            </button>
        </div>
    </div>
</template>

<script setup>

    /* Yapilacak Islemde Obje Yapisi Kullanilacagi Icin 
        reactive Kullaniyoruz */
    /* Duruma Gore Degisken Islemler Yapilacagi Icin
        ref Kullaniyoruz */
    import { reactive, ref } from 'vue';
    import { AUTH } from '@/firebase/configs';
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();

    /* Degiskene Atanan Method Icinde Belirtilen Degere Gore 
        Ekranda Gorunecek Formu Belirliyoruz */
    const register = ref(false);

    const formData = reactive({
        email:'',
        password:''
    })

    const registerUser = async() => {
        try {
            await createUserWithEmailAndPassword(AUTH,formData.email,formData.password);
            router.push('/');
        } catch (error) {
            console.log(error.message)
        }
    }

    const signInUser = async() => {
        try {
            await signInWithEmailAndPassword(AUTH,formData.email,formData.password);
            router.push('/');
        } catch (error) {
            console.log(error.message)
        }
    }

    const submitForm = () =>{
        if(register.value){
            registerUser();
        }
        else{
            signInUser();
        }
    }
</script>