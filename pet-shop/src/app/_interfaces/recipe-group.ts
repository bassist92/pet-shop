import { IRecipe } from './recipe';

export interface IRecipeGroup {
    ingredients: string[];
    name: string;
    page: number;
    results: IRecipe[];
}
