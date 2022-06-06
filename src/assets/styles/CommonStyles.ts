import { createGlobalStyle } from 'styled-components'

const CommonStyle = createGlobalStyle`
  body {
    font-family: 'BlenderPro-Book';
  }

  .font-bold {
    font-family: 'BlenderPro-Bold';
  }

  .color-primary {
    background: ${({ theme }) => theme.color.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .color-secondary {
    color: ${({ theme }) => theme.color.secondary}
  }

  .color-white {
    color: ${({ theme }) => theme.color.white};
  }

  .color-neutral_gray {
    color: ${({ theme }) => theme.color.neutralGray}
  }

  .color-grey {
    color: ${({ theme }) => theme.color.grey}
  }

  .color-orange {
    color: ${({ theme }) => theme.color.orange}
  }

  .color-yellow {
    color: ${({ theme }) => theme.color.yellow}
  }

  .color-red {
    color: ${({ theme }) => theme.color.red}
  }
`

export default CommonStyle
