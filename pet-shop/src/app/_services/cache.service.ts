import { IRecipe } from '../_interfaces/recipe';
import { Injectable } from '@angular/core';
import { IRecipeGroup } from '../_interfaces/recipe-group';

@Injectable()
export class CacheService {
    cache: IRecipeGroup[] = [];

    /**
     * 
     * @param ingredients 
     * @param name
     * @param page
     */
    getCacheItem(ingredients: string[], name: string, page: number): IRecipe[] {
        const sorted = ingredients.slice().sort();
        const match = this.cache.find(c => {
            return c.ingredients.length === ingredients.length && 
                c.name === name &&
                c.page === page &&
                c.ingredients.slice().sort().every(function(value, index) {
                    // Check if the ingredients are the same
                    return value === sorted[index];
                });
        })

        if (match) {
            return match.results;
        }
        return null;
    }

    /**
     * 
     * @param ingredients 
     * @param name
     * @param results 
     */
    setCacheItem(ingredients: string[], name: string, page: number, results: IRecipe[]): void {
        this.cache.push({
            ingredients, name, page, results
        });
        console.dir(this.cache);
    }
}