import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import AddArticle from '@/components/admin/AddArticle.vue'
import Register from '@/components/users/Register.vue'
import UpdateArticle from '@/components/admin/UpdateArticle.vue'
import { AUTH } from '@/firebase/configs'

/* Sadece Kullanici Girisi Yapildiginda Gorunmesi Gerekenleri Duzenliyoruz */
const isAuth = (to,from) => {

    /* Kullanici Girisi Yapildi Mi Diye Bakiyoruz */
    let user = AUTH.currentUser;

    /* Kullanici Girisi Yapilmadi Ise Kullanici Kaydi Sayfasina Yonlendiriyoruz */
    if(!user){
        return '/users/register'
    }
    return true;
}

/* Kullanici Girisi Yapildiginda Gorunmemesi Gerekenleri Duzenliyoruz */
const isLoggedIn = (to,from) => {

    /* Kullanici Girisi Yapildi Mi Diye Bakiyoruz */
    let user = AUTH.currentUser;

    /* Kullanici Girisi Yapildi Ise Anasayfaya Yonlendiriyoruz */
    if(user){
        return '/'
    }
    return true;
}

/* beforeEnter Kullanilan Yerlerde Islem Yapilmasi Icin
    Kullanici Girisi Sarti Ariyoruz */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/users/register',
            component: Register,
            beforeEnter: isLoggedIn
        },
        {
            path: '/admin/addArticle',
            component: AddArticle,
            beforeEnter: isAuth
        },
        {
            path: '/admin/updateArticle/:id',
            component: UpdateArticle,
            beforeEnter: isAuth
        }
    ]
})

export default router