<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center">Yeni Yazı Ekle</h1>

            <!-- Butona Tiklandiginda Form Tetikleme Islemi Yapilarak 
                Girilen Bilgileri Database Gonderiyoruz -->
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label class="form-label">Başlık</label>

                    <!-- v-model Kullanarak Girilen Yaziyi 
                        formData Degiskeni Uzerinden Obje Icindeki 
                        title Attribute una Gonderiyoruz -->
                    <input v-model="formData.title" type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Yazı</label>

                    <!-- v-model Kullanarak Girilen Yaziyi 
                        formData Degiskeni Uzerinden Obje Icindeki
                        description Attribute una Gonderiyoruz -->
                    <textarea v-model="formData.description" type="text" class="form-control" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-lg">Ekle</button>
            </form>
        </div>
    </div>
</template>

<script setup>

    import { DB } from "@/firebase/configs";

    /* Database e Data Eklemek Icin addDoc Kullaniyoruz */
    import { collection, addDoc } from "firebase/firestore";

    /* Database e Data Eklemek Icin Obje Yapisini Kullaniyoruz */
    import { reactive } from 'vue'

    /* Yonlendirme Islemi Yapiyoruz */
    import { useRouter } from 'vue-router'

    const router = useRouter()

    /* Form Uzerinde Girilen Bilgileri 
        formData Degiskenine Atanan Objeye Aliyoruz */
    const formData = reactive({
        title:'',
        description:''
    })

    const submitForm = async() => {

        /* Database Baglantisini Aliyoruz */
        /* Method Icindeki 
            Ilk Parametre configs.js Dosyasindaki Database Baglantisinin Atanadigi Degisken Adi 
            Ikinci Parametre Google Firebase Icindeki Database e Verilen Ad */
        const notesCollection = collection(DB,'notes')

        /* Girilen Data lari Database e Ekleme Islemini Yapiyoruz */
        await addDoc(notesCollection,{

            /* Spread Operatoru Kullanilarak,
                formData Degiskenine Atanan Ve 
                Obje Olarak Tutulan Data lari Ekleme Islemi Yapiyoruz */
            ...formData
        })

        /* Form Uzerinden Bilgi Girilme Isleminden Sonra 
            Kaydetme Butonuna Tiklandiginda 
            Inputlara Girilen Degerleri Siliyoruz */
        formData.title='';
        formData.description='';

        /* Kaydetme Isleminden Sonra Anasayfaya Yonlendirme Yapiyoruz */
        router.push('/')
    }
</script>