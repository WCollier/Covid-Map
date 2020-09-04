import React from 'react';

import { Container } from '@material-ui/core';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryVoronoiContainer, VictoryAxis } from 'victory';
import { useAsync, AsyncProps } from 'react-async';

interface CountryTotal {
    Confirmed: number,
    Deaths: number,
    Recovered: number,
    Active: number,
    Date: string,
}

type CountryTotals = CountryTotal[];

async function loadData({ slug }: AsyncProps<any>): Promise<CountryTotals> {
    const res = await fetch(`https://api.covid19api.com/total/country/${slug}`);

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
}

interface CountryGraphProps {
    slug: string
}

function shortDate(date: Date): string {
    return `${date.toLocaleString("default", { month: "short" })} - ${date.getFullYear()}`;
}

export function CountryGraph({ slug }: CountryGraphProps) {
    const { data, error, isPending } = useAsync({ promiseFn: loadData, slug });

    if (isPending) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <div>Something went wrong: {error}</div>;
    }

    if (data) {
        const totalDeaths = data.map(country => ({ x: new Date(country.Date), y: country.Deaths }));

        const container =
            <VictoryVoronoiContainer labels={({ datum }) => `${datum.x.toLocaleDateString()}, ${datum.y}`} />;

        const shortMonths = totalDeaths.map(({ x }) => shortDate(x));

        const numMonths = Array.from(new Set(shortMonths)).length;

        return (
            <Container maxWidth="md">
                <VictoryChart scale={{ x: "time", y: "linear" }} theme={VictoryTheme.grayscale} containerComponent={container}>
                    <VictoryAxis crossAxis={false} tickFormat={(date: Date) => shortDate(date)} orientation="bottom" label="Months" tickCount={numMonths} style={{ tickLabels: { fontSize: 5, angle: 45 }}} />
                    <VictoryAxis dependentAxis crossAxis={false} orientation="left" label="Deaths" style={{ tickLabels: { fontSize: 5, angle: 45 }}} />
                    <VictoryLine data={totalDeaths}></VictoryLine>
                </VictoryChart>
            </Container>
        );
    }

    return <></>;
}