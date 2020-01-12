// import original module declarations
import 'styled-components'

/*
cube: {
    border: string;
    textColor: string;
    primaryColor: string;
    colorRed: string;
    colorOrange: string;
    colorYellow: string;
    lightGreyColor: string;
    hoverBackgroundColor: string;
    selectBackgroundColor: string;
    boxShadow: string;
    transition: string;
};
input: {
    backgroundColor: string;
    backgroundColorHover: string;
    borderRadius: string;
    borderColor: string;
    labelColor: string;
    placeholderColor: string;
};
borderRadius: string; */
// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        border: string;
        borderColor: string;
        borderRadius: string;
        colors: {
            primary: {
                default: string;
            };
            secondary: {
                default: string;
            };
            text: string;
        };
    }
}
