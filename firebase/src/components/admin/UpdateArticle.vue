<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center">Yazıyı Güncelle</h1>

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
                <button type="submit" class="btn btn-primary btn-lg m-5">
                    Güncelle
                </button>
                <button type="submit" @click="deleteNote" class="btn btn-primary btn-lg">
                    Sil
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>

    import { DB } from "@/firebase/configs";

    /* Database e Data Eklemek Icin addDoc Kullaniyoruz */
    import { collection, addDoc } from "firebase/firestore";

    /* updateDoc Kullanilarak Database Icinde Var Olan Degeri Guncelleme Islemi Yapiyoruz */
    /* deleteDoc Kullanilarak Database Icinde Var Olan Degeri Silme Islemi Yapiyoruz */
    import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

    /* Database e Data Eklemek Icin Obje Yapisini Kullaniyoruz */
    import { reactive } from 'vue'

    /* Yonlendirme Islemi Yapiyoruz */
    import { useRouter,useRoute } from 'vue-router'

    const router = useRouter();
    const route = useRoute();

    /* Form Uzerinde Girilen Bilgileri 
        formData Degiskenine Atanan Objeye Aliyoruz */
    const formData = reactive({
        title:'',
        description:''
    })

    /* Method Icindeki 
        Ilk Parametre Database Baglantisinin Atandigi configs.js Dosyasindaki Degisken Adi 
        Ikinci Parametre Google Firebase Icindeki Database Adi 
        Ucuncu Parametre Google Firebase Icinden Alinan Data nin id Bilgisi */
    const docRef = doc(DB,"notes",route.params.id)
    getDoc(docRef).then(snapshot => {
        // console.log(snapshot.data())

        /* snapshot Degiskeni Uzerinden 
            Elde Edilen Obje Icindeki Datalara 
            data Method Ile Erisiyoruz
            Eristigimiz Attributelardan Gerekli Olanlari Kullaniyoruz */
        formData.title = snapshot.data().title;
        formData.description = snapshot.data().description;
    }).catch(error=>{
        console.log(error);
    })
    const submitForm = async() => {

        try {
            /* Method Icindeki 
                Ilk Parametre Database Baglantisinin Atandigi configs.js Dosyasindaki Degisken Adi 
                Ikinci Parametre Google Firebase Icindeki Database Adi 
                Ucuncu Parametre Google Firebase Icinden Alinan Data nin id Bilgisi */
            const docRef = doc(DB,"notes",route.params.id);
            
            /* Method Icindeki 
                Ilk Parametre Database Icindeki Var Olan Degerlerin Alindigi Degisken Adi 
                Ikinci Parametre Form Uzerinde Girilen Data larin Alinip formData Degiskenine Atanan Obje */
            await updateDoc(docRef,{...formData})

            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async() => {

        try {
            /* Method Icindeki 
                Ilk Parametre Database Baglantisinin Atandigi configs.js Dosyasindaki Degisken Adi 
                Ikinci Parametre Google Firebase Icindeki Database Adi 
                Ucuncu Parametre Google Firebase Icinden Alinan Data nin id Bilgisi */
            const docRef = doc(DB,"notes",route.params.id);
            
            /* Method Icindeki 
                Ilk Parametre Database Icindeki Var Olan Degerlerin Alindigi Degisken Adi 
                Ikinci Parametre Form Uzerinde Girilen Data larin Alinip formData Degiskenine Atanan Obje */
            await deleteDoc(docRef,{...formData})

            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

</script>