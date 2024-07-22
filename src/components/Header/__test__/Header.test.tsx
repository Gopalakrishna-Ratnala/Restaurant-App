import React from 'react';
import { render, screen } from '@testing-library/react';
import  Header  from '../../Header';
import { BrowserRouter, Router, withRouter } from 'react-router-dom';

const RenderComponent = () => {
    return render(
        <BrowserRouter>
            withRouter(<Header />)
        </BrowserRouter>
    );

};   


test('should render the login form', async () => {
    RenderComponent()
    const loginForm = screen.getByText(/Tasty Kitchens/i);
    expect(loginForm).toBeInTheDocument();
})

test("should render the logout button", async () => {   
    RenderComponent()
    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
})


test("should render the home link", async () => {   
    RenderComponent()
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
})  

