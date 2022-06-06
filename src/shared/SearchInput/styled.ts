import styled from 'styled-components'

const SearchInputStyled = styled.div`
  width: 350px;
  padding: 8px 12px;
  column-gap: 8px;

  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(334px 0, 100% 16px, 100% 100%, 0 100%, 0 0);

  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
    width: 100%;
    clip-path: none;
  }

  .orange-line {
    right: 0;
    bottom: 0;

    width: 68px;
    height: 2px;
  }

  .search-icon {
    width: 20px;
  }

  .search-input {
    background-color: ${({ theme }) => theme.color.transparent};
    border: none;

    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.color.white};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.color.grey};
    }
  }
`

export default SearchInputStyled
