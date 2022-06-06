import styled from 'styled-components'

const ChooseHorseModalStyled = styled.div`
  .choose-horse-modal {
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    padding: 32px;

    .race-name-container {
      margin-bottom: 16px;

      .race-name {
        font-size: 24px;
        line-height: 20px;
      }
    }

    .race-info-container {
      gap: 32px;
      padding-bottom: 25px;
      border-bottom: 2px solid ${({ theme }) => theme.color.black};

      .race-info-item {
        gap: 8px;

        .race-info-title {
          font-size: 12px;
          line-height: 14px;
        }

        .race-info-content {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }

    .search-horse-container {
      margin: 21px 0 16px 0;

      .search-title {
        font-size: 16px;
        line-height: 24px;
      }

      .search-input {
        background-color: ${({ theme }) => theme.color.black};
        opacity: 0.85;
        width: 240px;
      }
    }

    .horse-list-container {
      max-height: 450px;
      overflow-y: scroll;
      gap: 16px;
    }
  }
`

export default ChooseHorseModalStyled
