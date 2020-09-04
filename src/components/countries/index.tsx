import React from 'react';

import { CountriesTable } from './CountriesTable';

import { Summary } from '../../types';

interface CountriesProps {
    data: Summary,
}

export function Countries({ data }: CountriesProps) {
    return (
        <div>
            <h1>Countries</h1>

            <CountriesTable data={data}></CountriesTable>
        </div>
    );
}