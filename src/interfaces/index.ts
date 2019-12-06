export interface ICard {
  _id: string;
  title: string;
  description: string;
  theme: string;
}

export interface ITheme {
  _id: string;
  title: string;
  description: string;
}

export interface IThemeQuery {
  themes: ITheme[];
}

export interface ICardQuery {
  cards: ICard[];
}
