import React, { Component } from 'react';
import './App.css';
import './LocalStorageManager';
import $ from 'jquery';
import {LocalStorageManager} from "./LocalStorageManager";
import {ListPane} from './Components/ListPane';
import {RecipePane} from './Components/RecipePane';
import {NewRecipeDialog} from './Components/NewRecipeDialog';

const recipeIndex = [
    {
        'recipe' : 'Artichoke Pasta','ingredients' : ['2 tablespoons butter', '2 cloves garlic, minced','1 cup heavy cream','3/4 teaspoon salt','1 teaspoon fresh-ground black pepper', '2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters','3/4 pound fusilli','1/2 cup grated Parmesan cheese','2 tablespoons chopped chives, scallion tops, or parsley',],'directions' : ['In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes.','In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.']
    },
    {
        'recipe' : "Garlic Chicken","ingredients" : ["3 tablespoons butter","1 teaspoon seasoning salt","1 teaspoon onion powder ","4 skinless, boneless chicken breast halves","2 teaspoons garlic powder"], "directions" : ["Melt butter in a large skillet over medium high heat.", "Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.", "Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear."]
    },
    {
        "recipe" : "Easy Chocolate Pie","ingredients" : ["1 (12 ounce) can evaporated milk","1 (5.9 ounce) package chocolate instant pudding mix", "1 (6.5 ounce) can whipped cream", "1/2 cup miniature semi-sweet chocolate chips (optional)","1 (9 inch) graham cracker pie crust","Another can of whipped cream for garnish (optional)"], "directions" : ["Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.","Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover.","Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired."]
    },
    {
        'recipe' : 'Lime Chicken Tacos', 'ingredients' : ['1 1/2 pounds skinless, boneless chicken breast meat - cubed', '1/8 cup red wine vinegar', '1/2 lime, juiced', '1 teaspoon white sugar', '1/2 teaspoon salt', '1/2 teaspoon ground black pepper', '2 green onions, chopped', '2 cloves garlic, minced', '1 teaspoon dried oregano', '10 (6 inch) corn tortillas', '1 tomato, diced', '1/4 cup shredded lettuce', '1/4 cup shredded Monterey Jack cheese', '1/4 cup salsa'], 'directions' : ['Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.', 'Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.']
    },
    {
        'recipe': 'Artichoke Dip','ingredients' : ['1 8oz package soft cream cheese', '4oz mayonnaise','4oz sour cream','1/4 Cup Fresh Grated Parmesan Cheese','1/4 Cup Fresh Grated Romano Cheese','2 eggs','3/4 Cup dairy sour cream','1 16oz can artichoke hearts','1/4 Cup fresh chopped chives','1 tbs fresh minced garlic'],'directions' : ['Soften the cream cheese before mixing.','Rinse well, then dice the artichokes into small ½” size pieces.','Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.','When the mixture is fairly well blended, spoon into a 9” round glass pie dish.', 'Set Oven to Bake at 350 degrees.','Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.','Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.','Enjoy!']
    },
];
const LSM = new LocalStorageManager();
if(LSM.get() === null) {
  LSM.set(recipeIndex);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
        recipes: LSM.get(),
        currentRecipe: LSM.get()[0],
        productsData: '',
        dialogIngredients: [],
        dialogValue: ''
    }
    this.currentRecipeHandler = this.currentRecipeHandler.bind(this);
    this.dialogOpenHandler = this.dialogOpenHandler.bind(this);
    this.addNewRecipe = this.addNewRecipe.bind(this);
    this.deleteButtonHandler = this.deleteButtonHandler.bind(this);
    this.editButtonHandler = this.editButtonHandler.bind(this);
    this.addIngredientsToList = this.addIngredientsToList.bind(this);
    this.deleteDialogIngredient = this.deleteDialogIngredient.bind(this);
  }

  currentRecipeHandler(event) {
      this.state.recipes.filter((item) => {
          if(item.recipe.replace(/ /g, '-') == event.currentTarget.id) {
              this.setState({
                  currentRecipe: item
              })
          }
      })
  }
  highlightList() {
        $('.list-group-item').map((index, it) => {
            if(it.id == this.state.currentRecipe.recipe.replace(/ /g, '-')) {
                $(it).addClass('active')
            } else {
                $(it).removeClass('active');
            }
        });
    }
  dialogOpenHandler(event) {
      setTimeout(() => {
          $('#dialog-recipe').val('');
          $('#dialog-grammes').val('');
          $('#dialog-actions').val('');
          this.setState({
              dialogIngredients: [],
              dialogValue: ''
          })
      },10);
  }
  addNewRecipe(event) {
     let newRecipe = {
          'recipe' : $('#dialog-recipe').val(),
          'ingredients' : this.state.dialogIngredients,
          'directions' : $('#dialog-actions').val()
      }
      let recipes = [...this.state.recipes].concat(newRecipe);
      this.setState({
          recipes: recipes
      })
      LSM.set(recipes);
      this.setState({
          currentRecipe: newRecipe
      });
      this.highlightList();
  }
  deleteButtonHandler(event) {
      let recipes = [];
      this.state.recipes.filter((item) => {
          if(item.recipe != this.state.currentRecipe.recipe) {
              recipes.push(item);
          }
      });
      this.setState({
          recipes: recipes
      })
      LSM.set(recipes);
  }
  editButtonHandler(event) {
      this.setState({ show: true });
      setTimeout(() => {
          $('#dialog-recipe').val(this.state.currentRecipe.recipe);
          this.setState({
              dialogIngredients: this.state.currentRecipe.ingredients
          })
          $('#dialog-actions').val(this.state.currentRecipe.directions);
          $('#save-changes').one('click', () => {
              this.deleteButtonHandler();
          })
      },10);
  }
  addIngredientsToList(event) {
      let kall = '';
      this.state.productsData.map((item) => {
          if(item.product == this.state.dialogValue) {
              kall = item.Calories;
          }
      });
      if(Number.isNaN(parseInt($('#dialog-grammes').val(), 10))) {
          $("[data-toggle=popover]").popover('show');
      } else {
          $("[data-toggle=popover]").popover('dispose');
          if(kall == '') {
              this.setState({
                  dialogIngredients: [...this.state.dialogIngredients].concat($('#dialog-grammes').val()+'gr '+this.state.dialogValue)
              });
          } else {
              kall = Math.round((kall/100)*parseInt($('#dialog-grammes').val()));
              this.setState({
                  dialogIngredients: [...this.state.dialogIngredients].concat($('#dialog-grammes').val()+'gr '+this.state.dialogValue+' '+kall+'kl')
              });
          }
      }
  }
  deleteDialogIngredient(event) {
      let arr = [];
      arr = this.state.dialogIngredients.filter((item, index) => index != Number(event.currentTarget.id)
      );
      console.log(typeof(Number(event.currentTarget.id)));
      this.setState({
          dialogIngredients: arr
      });
  }
  componentDidMount() {
      $(`#${this.state.currentRecipe.recipe.replace(/ /g, '-')}`).addClass('active');
      $.ajax({
          url: 'https://gist.githubusercontent.com/moonWanted/0de211d067ce87749c14fbc014e7cd48/raw/c1e19be50a9f6e697e6e1cab5d87ad661e2dcd08/products.json',
          success: (data) => {
              this.setState({
                  productsData: JSON.parse(data)
              });
      }
      })
  }
  componentDidUpdate() {
      this.highlightList();
  }

  render() {
    return (
      <div className="App">
        <h1>Your CookBook</h1>
        <ListPane listPaneHandler={this.currentRecipeHandler} recipeNames={this.state.recipes}/>
          <RecipePane currentRecipe={this.state.currentRecipe} deleteButtonHandler={this.deleteButtonHandler} editButtonHandler={this.editButtonHandler}/>
          <NewRecipeDialog value={this.state.dialogValue} onChangeDialogIngedients={e => this.setState({ dialogValue: e.target.value })} onSelectDialogIngedients={value => this.setState({ dialogValue: value })} dialogIngredients={this.state.dialogIngredients} addIngredientsButtonHandler={this.addIngredientsToList} deleteDialogIngredient={this.deleteDialogIngredient} productsData={this.state.productsData} showState={this.state.show} handleShow={this.dialogOpenHandler} addNewRecipe={this.addNewRecipe}/>
      </div>
    );
  }
}

export default App;
