<template>
  <main class="add-smoothie container mt-3">
    <div class="card">
      <div class="card-content">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form class="mt-3" v-on:submit.prevent="addSmoothie()">
          <div class="input-field title">
            <input type="text" name="title" id="title" v-model="title">
            <label for="title">Smoothie title</label>
          </div>
          <div v-for="(ing, index) in ingredients" v-bind:key="index" class="ing-field">
            <label for="ingredients">Ingredient:</label>
            <input type="text" name="ingredient" v-model="ingredients[index]">
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
            <button class="btn pink">Add Smoothie</button>
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
  name: "AddSmothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null;
        // create slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
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
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add ingredient!";
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>

<style>
.add-smoothie {
  max-width: 600px;
  padding: 20px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .ing-field {
  position: relative;
}

.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  cursor: pointer;
  font-size: 1.8em;
}
</style>
