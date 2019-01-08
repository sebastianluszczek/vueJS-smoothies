<template>
  <main class="index container mt-3">
    <div class="row">
      <div class="col s12 m6 l4" v-for="smoothie in smoothies" v-bind:key="smoothie.id">
        <div class="card">
          <div class="card-content">
            <i class="material-icons delete" v-on:click="deleteSmoothie(smoothie.id)">delete</i>
            <h2 class="indigo-text">{{smoothie.title}}</h2>
            <ul class="ingredients center-align">
              <li v-for="(ingredient, index) in smoothie.ingredients" v-bind:key="index">
                <span class="chip">{{ingredient}}</span>
              </li>
            </ul>
          </div>
          <span class="btn-floating btn-large halfway-fab pink">
            <router-link
              v-bind:to="{ name: 'EditSmoothie', params: {
              smoothie_slug: smoothie.slug
            }}"
            >
              <i class="material-icons edit">edit</i>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestor
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id;
          });
        });
    }
  },
  created() {
    // fetch data from firestore
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 20px;
}
.mt-3 {
  margin-top: 3rem;
}
.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
