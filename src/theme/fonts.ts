import { TextStyle } from "react-native"

const size =  {
    xxs: '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '1.75rem',
    xxxxl: '2rem',
}

const weight: {[key: string] : TextStyle['fontWeight']} = {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    full: '900',

}

export default { size, weight }