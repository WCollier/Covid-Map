import React from 'react';

import { useHistory } from 'react-router-dom';
import { Geography } from 'react-simple-maps';

import { Filter, calculateFilter } from './DataFilter';

import { Country as CountryModel } from "../../types";

interface CountryProps {
    // The types here are crappy
    geo: any,
    colour: string,
    country?: CountryModel,
    filter: Filter,
    setToolTipContent: React.Dispatch<React.SetStateAction<string>>,
}

export function Country({ geo, colour, country, filter, setToolTipContent }: CountryProps) {
    const history = useHistory();

    const onMouseEnter = () => {
        let message = "??? - ???";

        if (country) {
            message = `${country.Country} - ${calculateFilter(filter, country).toLocaleString()}`;

            if (filter === Filter.TotalRecovered || filter === Filter.NewRecovered) {
                message = `${message}%`;
            }
        }

        setToolTipContent(message);
    };

    const onMouseLeave = () => setToolTipContent("");

    const onMouseClick = () => {
        if (country) {
            history.push({ pathname: `/countries/${country?.Slug}`, state: country })
        }
    };

    return (
        <Geography
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onMouseClick}
            geography={geo}
            fill={colour}
            style={{
                default: { outline: "none" },
                hover: { outline: "none", cursor: "pointer" },
                pressed: { outline: "none" },
            }}
        />
    );
}