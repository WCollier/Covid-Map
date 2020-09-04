export interface Summary {
  Global: Global,
  Countries: Country[],
}

export interface Global {
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
}

export interface Country {
  Country: string,
  CountryCode: string,
  Slug: string,
  TotalConfirmed: number,
  TotalDeaths: number,
  TotalRecovered: number,
  NewConfirmed: number,
  NewDeaths: number,
  NewRecovered: number,
  Date: string,
}
