import React from 'react';

import { useLocation } from 'react-router-dom';

import { CountryGraph } from './CountryGraph';

import { Country as CountryModel } from '../../types';

export function Country() {
    const country = useLocation<CountryModel>().state;

    console.log(country);

    if (!country) {
        return <h1>Could not find country :(</h1>;
    }

    return (
        <div>
            <header>
                <h1>{country.Country}</h1>

                <h3>{new Date(country.Date).toLocaleDateString()}:</h3>

                <p>New Confirmed: {country.NewConfirmed.toLocaleString()}, New Deaths: {country.NewDeaths.toLocaleString()}, New Recovered: {country.NewRecovered.toLocaleString()}</p>

                <h3>Total:</h3>

                <p>Total Confirmed: {country.TotalConfirmed.toLocaleString()}, Total Deaths: {country.TotalDeaths.toLocaleString()}, Total Recovered: {country.TotalRecovered.toLocaleString()}</p>

                <CountryGraph slug={country.Slug}></CountryGraph>
            </header>
        </div>
    );
}