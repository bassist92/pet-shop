import { Component } from "@angular/core";
import { DataService } from 'src/app/_services/data.service';
import { IRecipe } from 'src/app/_interfaces/recipe';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { IRecipeGroup } from "src/app/_interfaces/recipe-group";

@Component({
    selector: "app-results",
    templateUrl: "./results.component.html",
    styleUrls: ["./results.component.scss"]
})
export class ResultsComponent {
    recipes: IRecipe[] = [];
    favourites = new Set<string>();
    alerts: IRecipeGroup[] = [];
    faStar = faStar;
    hasSearched = false;

    constructor(private dataService: DataService) {
        this.dataService.recipeEmitter.subscribe((newRecipeSet: IRecipeGroup) => {
            this.hasSearched = true;

            if (newRecipeSet.page === 1) {
                this.recipes = newRecipeSet.results;
            } else {
                // This is an update
                const existingAlert: IRecipeGroup = this.getUpdatesAlert(newRecipeSet);
                if (!existingAlert) {
                    this.alerts.push(newRecipeSet);
                }
            }
        });
    }

    getUpdatesAlert(newRecipeSet: IRecipeGroup): IRecipeGroup {
        const sorted = newRecipeSet.ingredients.slice().sort();
        return this.alerts.find(a => a.name === newRecipeSet.name && a.ingredients.slice().sort().every(function(value, index) {
            // Check if the ingredients are the same
            return value === sorted[index];
        }));
    }

    clearAlert(alert: IRecipeGroup) {
        const index = this.alerts.indexOf(alert);
        this.alerts.slice(index);
    }

    /**
     * 
     * @param title 
     */
    toggleFavourite(title: string) {
        if (this.isFavourite(title)) {
            this.favourites.delete(title);
        } else {
            this.favourites.add(title);
        }
    }

    /**
     * 
     * @param title 
     */
    isFavourite(title: string): boolean {
        return this.favourites.has(title);
    }

    update() {
        alert("I don't do anything")
    }
}