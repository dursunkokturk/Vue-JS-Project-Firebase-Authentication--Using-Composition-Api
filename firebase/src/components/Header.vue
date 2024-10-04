<template>
    <div class="container">
        <header class="d-flex py-3 border-bottom mb-5">
            <a href="/" class="me-auto text-decoration-none">
                <span class="fs-3">Dursun Köktürk</span>
            </a>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/">Yazılarım</RouterLink>
                </li>
                <li class="nav-item" v-if="!isAuth">
                    <RouterLink class="nav-link" to="/users/register">
                        Kayıt Ol
                    </RouterLink>
                </li>
                <li class="nav-item" v-if="isAuth">
                    <p class="nav-link" @click="handleSignOut">Çıkış Yap</p>
                </li>
                <li class="nav-item" v-if="isAuth">
                    <RouterLink class="nav-link" to="/admin/addArticle">Yazı Ekle</RouterLink>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>

    import { AUTH } from '@/firebase/configs';

    /* Kullanici Girisi Yapilma Durumunu Kontrol Etmek Icin 
        onAuthStateChanged Kullaniyoruz */
    import { signOut,onAuthStateChanged } from 'firebase/auth'
    import { ref } from 'vue'

    /* Kullanici Girisi Yapilma Durumuna Bakiyoruz */
    const isAuth = ref(AUTH.currentUser)

    onAuthStateChanged(AUTH,user=>{
        // console.log(user)

        /* Giris Yapilan Kullanici Bilgilerini Aliyoruz */
        isAuth.value = user;
    })

    const handleSignOut = () => {
        try {
            signOut(AUTH);
        } catch (error) {
            console.log(error.message);
        }
    }
 
</script>