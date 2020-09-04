import React from 'react';

import { useHistory } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core';

import { Summary, Country as CountryModel } from '../../types';

interface CountryTableProps {
    data: Summary,
}

export function CountriesTable({ data }: CountryTableProps) {
    const history = useHistory();

    const countryClick = (country: CountryModel) => 
        history.push({ pathname: `/countries/${country.Slug}`, state: country });

    const tableRow = data.Countries.map(country =>
        <TableRow key={country.CountryCode} onClick={(_) => countryClick(country)} style={{cursor: "pointer"}}>
            <TableCell align="left" component="th" scope="row">{country.Country}</TableCell>
            <TableCell align="left">{country.NewConfirmed.toLocaleString()}</TableCell>
            <TableCell align="left">{country.TotalConfirmed.toLocaleString()}</TableCell>
            <TableCell align="left">{country.NewDeaths.toLocaleString()}</TableCell>
            <TableCell align="left">{country.TotalDeaths.toLocaleString()}</TableCell>
            <TableCell align="left">{country.TotalRecovered.toLocaleString()}</TableCell>
        </TableRow>
    );

    const tableHeaders = ["Country", "New Confirmed", "Total Confirmed", "New Deaths", "Total Deaths", "Total Recovered"]
        .map(header => <TableCell key={header.toLowerCase()} align="left">{header}</TableCell>);

    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {tableHeaders}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRow}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}