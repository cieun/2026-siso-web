import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      redShimmer: string;
      digitalYellow: string;
      lasPalmas: string;
      lemony: string;
      oceanWater: string;
      sportyPink: string;
      smoothPink: string;
      babyBlueEyes: string;
      newGray: string;
      intenseAzure: string;
      solidPeach: string;
    };
    mobile: string;
    tablet: string;
  }
}
