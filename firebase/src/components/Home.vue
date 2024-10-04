<template>
    <h1>Javascript Frameworks</h1>
    <div class="row g-4">
        <div class="col-md-6" v-for="note in notes">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{note.title}}</h5>
                    <p class="card-text">{{note.description}}</p>
                </div>
                <div class="card-footer">
                    <router-link :to="`/admin/updateArticle/${note.id}`" class="btn btn-primary">
                        Yazıyı Güncelle
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { DB } from '@/firebase/configs'
    import router from '@/router';

    /* getDocs Birden Fazla Data Almak Icin Kullaniliyor */
    import { collection, getDocs } from "firebase/firestore";
    import { ref } from 'vue'

    const notes = ref([])

    /* Method Icindeki 
        Ilk Parametre configs.js Dosyasinda Database Baglantisinin Atandigi Degisken Adi 
        Ikinci Parametre Google Firebase Uzerinde Olusturulan Database in Adi */
    const notesCollection = collection(DB,'notes')

    getDocs(notesCollection).then(snapShot => {
        // console.log(snapShot)
        let documents = [];

        /* snapShot Degiskeni Icindeki Data lari 
            docs Uzerinden forEach Dongusu Ile Tarama Yapiyoruz */
        snapShot.docs.forEach(doc => {

            /* push Method Icindeki 
                Ilk Kisimda doc Degiskeni Uzerindden data Method Icindeki Field lari Ceviriyoruz 
                Ikinci Kisimda doc Degiskeni Uzerinden data Method Icindeki Data larin id Bilgisini Aliyoruz Ve id Parametresini Gonderiyoruz */
            documents.push({...doc.data(),id:doc.id})
        })

        /* documents Degiskenine Atanan Array Icindeki Data yi
            notes Degiskeni Uzerinden Google Firebase Database e Gonderiyoruz */
        notes.value = documents;

        console.log(notes);
    })

</script>