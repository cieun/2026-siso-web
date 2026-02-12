import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      redShimmer: string;
      digitalYellow: string;
      lasPalmas: string;
      oceanWater: string;
      sportyPink: string;
      newGray: string;
    };
    mobile: string;
    tablet: string;
  }
}
