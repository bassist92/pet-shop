import { EventEmitter } from '@angular/core';
import { IRecipeGroup } from '../_interfaces/recipe-group';

export class DataService {
    recipeEmitter: EventEmitter<IRecipeGroup> = new EventEmitter();
}