import styled from 'styled-components'

const ProfileStyled = styled.div`
  .profile {
    padding-top: 64px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      padding-top: 30px;
    }

    .container {
      .profile-section {
        margin-bottom: 8px;

        .bg-container {
          &:hover {
            .bg-btn {
              display: block;
            }
          }

          .bg {
            height: 240px;
            object-fit: cover;
            object-position: center;

            ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
              height: 200px;
            }

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              height: 110px;
            }
          }

          .bg-btn {
            top: 12px;
            right: 12px;

            display: none;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              top: 6px;
              right: 6px;
            }

            .bg-label {
              img {
                width: 40px;
                aspect-ratio: 1 / 1;
              }
            }
          }
        }

        .profile-container {
          background-color: ${({ theme }) => theme.color.neutral};
          padding: 0 64px;

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            padding: 0 32px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            padding: 0 12px;
          }

          .top-container {
            height: 92px;
            gap: 24px;
            margin-bottom: 19px;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              gap: 16px;
            }

            .avatar-container {
              height: 100%;
              width: 160px;

              ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                width: 120px;
              }

              .avatar-wrapper {
                aspect-ratio: 1 / 1;
                bottom: 0;
                background-color: ${({ theme }) => theme.color.neutral};

                .avatar-box {
                  width: 150px;
                  aspect-ratio: 1 / 1;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    width: 114px;
                  }

                  &:hover {
                    .avatar-overlay {
                      display: flex;
                    }
                  }

                  .avatar {
                    width: 100%;
                    object-fit: cover;
                    object-position: center;
                  }

                  .avatar-overlay {
                    background-color: rgba(0, 0, 0, 0.6);
                    bottom: 0;
                    left: 0;
                    display: none;

                    img {
                      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                        width: 17px;
                      }
                    }

                    .overlay-text {
                      font-size: 14px;
                      line-height: 20px;

                      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                        font-size: 12px;
                        line-height: 14px;
                      }
                    }
                  }
                }
              }
            }

            .info-container {
              gap: 14px;

              .name-container {
                font-size: 24px;
                line-height: 20px;

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  font-size: 22px;
                  line-height: 18px;
                }
              }

              .action-container {
                gap: 40px;

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  gap: 22px;
                }

                .action-item {
                  gap: 4px;

                  span {
                    font-size: 14px;
                    line-height: 20px;
                  }
                }
              }
            }
          }

          .bottom-container {
            padding-bottom: 32px;

            .stat-item {
              width: 140px;

              .stat-title {
                margin-bottom: 12px;
                .title {
                  font-size: 14px;
                  line-height: 17px;
                }
              }
            }

            .stat-content {
              font-size: 16px;
              line-height: 19px;
            }
          }
        }
      }

      .my-horse-section {
        background-color: ${({ theme }) => theme.color.neutral};
        padding: 32px 64px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          padding: 32px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
          padding: 16px 12px;
        }

        .title {
          font-size: 24px;
          line-height: 20px;
          margin-bottom: 16px;
        }

        .search-container {
          margin-bottom: 12px;

          .search-horse-input {
            background-color: ${({ theme }) => theme.color.darkBlue};
          }
        }

        .my-horse-container {
          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            overflow-x: scroll;
          }

          .my-horse-table {
            border-collapse: separate;
            border-spacing: 0px 16px;

            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              min-width: 760px;
            }
          }
        }
      }
    }
  }
`

export default ProfileStyled
