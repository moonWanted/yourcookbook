export class LocalStorageManager {
    set(obj) {
        let currentRecipes = JSON.stringify(obj);
        localStorage.setItem('your_cook_book_recipes', currentRecipes);
    }
    get() {
        let currentRecipes = localStorage.getItem('your_cook_book_recipes');
        return JSON.parse(currentRecipes);
    }
}