import { CacheService } from './cache.service';
import { HttpService } from './http.service';
import { IRecipe } from '../_interfaces/recipe';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class RecipeService implements OnDestroy {
    recipeSubscription: Subscription;

    constructor (private cacheService: CacheService, private httpService: HttpService) { }

    /**
     * 
     * @param ingredients 
     * @param name
     * @param page
     */
    getRecipes(ingredients: string[], name: string, page = 1): Promise<IRecipe[]> {
        return new Promise<IRecipe[]>((resolve) => {
            const cached = this.cacheService.getCacheItem(ingredients, name, page);
            if (!cached) {
                console.log(`Getting recipes for ingredients ${ingredients.join(", ")}, name ${(name || "[blank]")} and page ${page} from API`);
                this.recipeSubscription = this.httpService.requestRecipes(ingredients, name, page)
                    .subscribe((results: IRecipe[]) => {
                        this.cacheService.setCacheItem(ingredients, name, page, results);

                        // Return the first set of results immediately
                        resolve(results);
                    });
            } else {
                console.log(`Getting recipes for ingredients ${ingredients.join(", ")}, name ${(name || "[blank]")} and page ${page} from cache`);
                resolve(cached);
            }
        });
    }

    ngOnDestroy() {
        if (this.recipeSubscription) {
            this.recipeSubscription.unsubscribe();
        }
    }
}
