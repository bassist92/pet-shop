import { Component, ViewChild, ElementRef } from "@angular/core";
import { RecipeService } from 'src/app/_services/recipe.service';
import { DataService } from 'src/app/_services/data.service';
import { IRecipe } from 'src/app/_interfaces/recipe';

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent {
    @ViewChild("recipeName") recipeName: ElementRef;
    ingredients = ["broccoli", "butter", "sweetcorn", "sausage", "beans", "tomato", "chicken", "bacon", "onion", "tofu"];
    searching = false;
    selectedIngredients = new Set<string>();

    constructor(private recipeService: RecipeService, private dataService: DataService) { }

    /**
     * 
     * @param ingredient 
     */
    selectIngredient(ingredient) {
        if (this.selectedIngredients.has(ingredient)) {
            this.selectedIngredients.delete(ingredient);
        } else {
            this.selectedIngredients.add(ingredient);
        }
    }

    /**
     * 
     */
    async getRecipes() {
        this.searching = true;

        const name = this.recipeName.nativeElement.value;
        const ingredients = Array.from(this.selectedIngredients);
        let page = 1;

        const results = await this.recipeService.getRecipes(ingredients, name, page);
        this.dataService.recipeEmitter.emit({ name, page, ingredients, results });
        this.searching = false;

        if (name || ingredients.length) {
            // Fetch new recipes periodically
            setInterval(() => {
                page++;
                this.recipeService.getRecipes(ingredients, name, page)
                    .then((results: IRecipe[]) => {
                        this.dataService.recipeEmitter.emit({ name, page, ingredients, results });
                    });
            }, 10000);
        }
    }
}