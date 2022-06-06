import styled from 'styled-components'

const AuthStyled = styled.div`
  .login {
    .container {
      .title-container {
        margin-top: 64px;

        .title {
          font-size: 32px;
          line-height: 26px;

          margin-bottom: 12px;
        }

        .sub-title {
          font-size: 16px;
          line-height: 20px;
        }
      }

      .login-container {
        margin-top: 40px;

        .login-wrapper {
          gap: 24px;

          .login-btn {
            border: none;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              width: 100%;
              max-width: 273px;
            }

            &.login-btn--loading {
              opacity: 0.6;
            }

            .login-img {
              ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                width: 100%;
              }
            }
          }
        }
      }

      .err-container {
        margin-top: 40px;
      }
    }
  }
`

export default AuthStyled
