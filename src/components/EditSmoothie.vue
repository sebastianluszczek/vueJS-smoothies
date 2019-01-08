<template>
  <main v-if="smoothie" class="edit-smoothie container">
    <div class="card">
      <div class="card-content">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
        <form class="mt-3" v-on:submit.prevent="editSmoothie()">
          <div class="input-field title">
            <input type="text" name="title" id="title" v-model="smoothie.title" class="validate">
            <label for="title">Smoothie title</label>
          </div>
          <div v-for="(ing, index) in smoothie.ingredients" v-bind:key="index" class="ing-field">
            <label for="ingredients">Ingredient:</label>
            <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
            <i class="material-icons delete" v-on:click="deleteIng(ing)">delete</i>
          </div>
          <div class="input-field add-ingredient">
            <input
              type="text"
              name="add-ingredient"
              id="add_ingredient"
              v-on:keydown.tab.prevent="addIng"
              v-model="another"
            >
            <label for="add-ingredient">Add an Ingredient</label>
          </div>
          <div class="input-field center-align">
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <button class="btn pink">Update Smoothie</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  },
  methods: {
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add ingredient!";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing;
        }
      );
    },
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        // create slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter smoothie title!";
      }
    }
  }
};
</script>

<style>
.edit-smoothie {
  max-width: 600px;
  padding: 20px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .ing-field {
  position: relative;
}

.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  cursor: pointer;
  font-size: 1.8em;
}
</style>
