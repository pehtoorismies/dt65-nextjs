import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/titillium-web-v8-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Titillium Web Regular'), local('TitilliumWeb-Regular'),
         url('/fonts/titillium-web-v8-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/titillium-web-v8-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/titillium-web-v8-latin-regular.woff') format('woff'), /* Modern Browsers */
         url('/fonts/titillium-web-v8-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/titillium-web-v8-latin-regular.svg#TitilliumWeb') format('svg'); /* Legacy iOS */
  }
  /* titillium-web-600 - latin */
  @font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/titillium-web-v8-latin-600.eot'); /* IE9 Compat Modes */
    src: local('Titillium Web SemiBold'), local('TitilliumWeb-SemiBold'),
         url('/fonts/titillium-web-v8-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('/fonts/titillium-web-v8-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
         url('/fonts/titillium-web-v8-latin-600.woff') format('woff'), /* Modern Browsers */
         url('/fonts/titillium-web-v8-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
         url('/fonts/titillium-web-v8-latin-600.svg#TitilliumWeb') format('svg'); /* Legacy iOS */
  }
  html {
    font-size: 10px;
  }
  body {
    height: 100%;
    font-family: 'Titillium Web', sans-serif;
    background-color: white;  
  }
  p {
  line-height: 1.3;
  }
  .ql-editor {
    min-height: 250px;
  }
  .ql-editor strong {
    font-weight:bold;
  }
  .ql-editor em {
    font-style: italic;
  }
`
