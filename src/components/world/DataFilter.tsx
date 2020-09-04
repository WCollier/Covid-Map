import React from 'react';
import { MenuItem, Select } from '@material-ui/core';

import { Country } from '../../types';

export enum Filter {
    TotalDeaths = "Total Deaths",
    TotalRecovered = "Total Recovered",
    TotalConfirmed = "Total Confirmed",
    NewDeaths = "New Deaths",
    NewRecovered = "New Recovered",
    NewConfirmed = "New Confirmed",
}

function calculatePercentage(larger: number, lesser: number): number {
    const one = Math.floor(larger / 100);

    const percent = Math.floor(lesser / one);

    if (percent === Infinity || isNaN(percent)) {
        return 0;
    }

    if (percent >= 100) {
        return 100;
    }

    return percent;

}

export function calculateFilter(filter: Filter, country: Country): number {
    switch (filter) {
        case Filter.TotalDeaths:
            return country.TotalDeaths;

        case Filter.TotalRecovered:
            return calculatePercentage(country.TotalConfirmed, country.TotalRecovered);

        case Filter.TotalConfirmed:
            return country.TotalConfirmed;

        case Filter.NewDeaths:
            return country.NewDeaths;

        case Filter.NewRecovered:
            return calculatePercentage(country.NewConfirmed, country.NewRecovered);

        case Filter.NewConfirmed:
            return country.NewRecovered;
    }
}

interface DataFilterProps {
    filter: Filter,
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export function DataFilter({ filter, setFilter }: DataFilterProps) {
    const onClick = (e: React.ChangeEvent<{ value: unknown }>) =>
        setFilter(Filter[(e.target.value as string).replace(" ", "") as keyof typeof Filter]);

    const filters = Object.values(Filter).map(filter => {
        const value = filter[0].toUpperCase() + filter.slice(1);

        return (
            <MenuItem key={filter} value={value}>
                {value}
            </MenuItem>
        );
    });

    return (
        <div>
            <Select onChange={onClick} value={filter}>
                {filters}
            </Select>
        </div>
    );
}