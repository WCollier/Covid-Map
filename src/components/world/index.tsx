
import React, { useState, useEffect } from 'react';

import { Container } from '@material-ui/core';

import { Map } from './Map';
import { DataFilter, Filter, calculateFilter } from './DataFilter';

import { Summary, Country } from '../../types';

type SetSortedCallback = React.Dispatch<React.SetStateAction<number[]>>;

function handleSortedData(countries: Country[], filter: Filter, setSorted: SetSortedCallback) {
    const sortedData = countries.map((country) => calculateFilter(filter, country))
        .sort((prev, next) => prev - next);

    setSorted(sortedData);
}

export interface WorldProps {
    data: Summary,
}

export function World({ data }: WorldProps) {
    const [filter, setFilter] = useState(Filter.TotalDeaths);

    const [sortedData, setSortedData] = useState<number[]>([]);

    useEffect(() => {
        if (data) {
            handleSortedData(data.Countries, filter, setSortedData);
        }
    }, [data, filter]);

    return (
        <Container maxWidth="lg">
            <h1>{filter}</h1>
            <DataFilter filter={filter} setFilter={setFilter}></DataFilter>
            <Map filter={filter} data={data} sortedData={sortedData}></Map>
        </Container>
    );
}
