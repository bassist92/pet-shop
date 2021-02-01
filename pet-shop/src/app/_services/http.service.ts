import { IRecipe } from '../_interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }

    /**
     * 
     * @param ingredients 
     * @param name
     * @param page
     */
    requestRecipes(ingredients: string[], name: string, page: number): Observable<IRecipe[]> {
        const ingredientsString = ingredients.sort().join();
        return this.http.get("/api/", {
            params: {
                "i": ingredientsString,
                "q": name,
                "p": page.toString()
            }
        }).pipe(
            map((result: any) => {
                return result.results as IRecipe[];
            })
        );
    }
}