import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../Home'; // Corrected the path to the 'Home' component
import React from 'react';


const RenderComponent = () => {
    return render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
}


test('should render the home component', async () => {
    RenderComponent()
    const paragraphElement =  await screen.findByText(/Tasty Kitchens/i);
    expect(paragraphElement).toBeInTheDocument();
})


test("should render the List of Recipes", async () => {
    RenderComponent()
    const recipeList = await screen.getByText(/List of Recipes/i);
    expect(recipeList).toBeInTheDocument();
} )


