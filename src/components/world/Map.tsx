import React, { useState } from 'react';

import { ComposableMap, Geographies, ZoomableGroup } from 'react-simple-maps';
import { scaleQuantile, } from 'd3-scale';

import { Country } from './Country';
import { Filter, calculateFilter } from './DataFilter';

import { Summary } from '../../types';
import { REDS } from '../../colours';

import ReactTooltip from 'react-tooltip';

const GEO_URL =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface MapProps {
    filter: Filter,
    data: Summary,
    sortedData: number[]
}

export function Map({ filter, data, sortedData }: MapProps) {
    const [content, setContent] = useState("");

    const scale = scaleQuantile()
        .domain(sortedData)
        .range(REDS);

    return (
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
                <ZoomableGroup zoom={1}>
                    <Geographies geography={GEO_URL}>
                        {
                            ({ geographies }) => geographies.map(geo => {
                                const country = data.Countries.find(country => country.CountryCode === geo.properties.ISO_A2);

                                const colour = country ? `#${Math.floor(scale(calculateFilter(filter, country))).toString(16)}` : "#EEE";

                                return <Country key={geo.rsmKey} geo={geo} colour={colour} country={country} filter={filter} setToolTipContent={setContent}></Country>;
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip>{content}</ReactTooltip>
        </>
    );
}