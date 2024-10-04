import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* Header.vue Dosyasini Component Olarak Import Ediyoruz */
import Header from './components/Header.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { AUTH } from './firebase/configs'

let app;

/* Header Componenti Icindeki Data larin 
    Cikis Yapma Isleminden Sonra Sabit Kalmasini Sagliyoruz */
onAuthStateChanged(AUTH,()=>{
    if(!app){
        const app = createApp(App)
        app.use(router)

        /* Header Componentini 
            app-header Ismini Kullanarak 
            Projenin Tamaminda Kullanilabilir Hale Getiriyoruz */
        app.component('app-header',Header)
        app.mount('#app')
    }
})