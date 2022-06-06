/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { links } from 'apps'
import dayjs from 'dayjs'
import { Gate, GetRaceListParams, Race, RecordRace } from 'models'
import { Cell, Column, useTable } from 'react-table'
import { ClassTag } from 'shared'
import { accessor } from 'utils/columns'
import { capitalizeOnlyFirstLetter } from 'utils/helper'
import CountDownTime from '../CountDownTime'
import RaceTableStyled from './styled'

interface RaceTableProps {
  data: any[]
  columns: Column[]
  isRowClickable?: boolean
  onRegisterButtonClick?: (gateNumber: number) => void
  raisePage?: any
  params: GetRaceListParams
  loader?: boolean
  status?: string
}

const handleStartIn = (cell: Cell) => {
  if ((cell.row.original as Race).status === 'SCHEDULING') {
    return 'Scheduling...'
  }

  if ((cell.row.original as Race).status === 'WAITING') {
    return <CountDownTime time={cell.value} />
  }

  if ((cell.row.original as Race).status === 'LIVE') {
    return (
      <div className='starts-in color-red font-bold d-flex align-items-center'>
        <div className='dot' /> <span className='live-text'>Live</span>
      </div>
    )
  }
}

const renderDataTable = (cell: Cell, header: string) => {
  switch (header) {
    case accessor.racePosition:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.count_down:
      return handleStartIn(cell)
    case accessor.grade:
      return <ClassTag text={cell.value} isActive={true} />
    case accessor.totalPrize:
      return cell.value === 0 ? (
        '---'
      ) : (
        <div>
          <span className='color-orange font-bold'>${cell.value}</span>{' '}
          <span className='unit text-uppercase font-bold'>usd</span>
        </div>
      )
    case accessor.racePrize:
      return cell.value === undefined ? (
        '---'
      ) : (
        <div>
          <span className='color-primary font-bold'>${cell.value}</span>{' '}
          <span className='unit text-uppercase font-bold'>usd</span>
        </div>
      )
    case accessor.field:
      return <span>{capitalizeOnlyFirstLetter(cell.value ?? '')}</span>
    case accessor.distance:
      return <span className='font-bold'>{cell.value ? `${(cell.value as number).toLocaleString()}m` : '0m'}</span>
    case accessor.entryFee:
      return (
        <div className='entry-fee text-uppercase font-bold'>
          {cell.value === 0 ? (
            <span className='color-primary font-bold'>FREE</span>
          ) : (
            <>
              <span className='color-primary font-bold'>${cell.value}</span>{' '}
              <span className='unit text-uppercase font-bold'>usd</span>
            </>
          )}
        </div>
      )
    case accessor.horse:
      return <div dangerouslySetInnerHTML={{ __html: cell.value }} />
    case accessor.registered:
      return <span className='font-bold'>{cell.value}/12</span>
    case accessor.startIn:
    case accessor.endAt:
      return <span>{dayjs(cell.value).format('MMM DD YYYY HH:mm')}</span>
    case accessor.gate:
    case accessor.statistic:
    case accessor.ownerName:
    case accessor.bloodLine:
    case accessor.raceName:
      return <span className='font-bold'>{cell.render('Cell')}</span>
    default:
      return <span>{cell.render('Cell')}</span>
  }
}

const isEmptyGate = (row: any): row is Gate => row.horse === null && typeof row.gate === 'number'

function RaceTable({
  columns,
  data,
  isRowClickable = false,
  onRegisterButtonClick,
  raisePage,
  loader = false,
  params,
  status
}: RaceTableProps) {
  const navigate = useNavigate()
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
  const memoizedRenderDataTable = useCallback(renderDataTable, [columns, data])

  const tableBodyClass = classNames('table-body', { ['highlight']: status === 'RESULT' || status === 'CLOSED' })

  const handleRowItemClicked = (raceId: number) => {
    if (!isRowClickable) return

    return () => {
      navigate(links.race.detail(raceId))
    }
  }

  const handleRegisterButtonClick = (gateNumber: number) => () => {
    if (!onRegisterButtonClick) return

    onRegisterButtonClick(gateNumber)
  }

  return (
    <RaceTableStyled isRowClickable={isRowClickable}>
      <div className='race-table-container'>
        <div className='race-table'>
          <InfiniteScroll
            dataLength={data.length}
            next={() => raisePage({ ...params, page: params.page + 1 })}
            hasMore={true}
            loader={loader === false ? <ReactLoading className='loading' type={'spin'} /> : ''}
          >
            <table {...getTableProps()} className='table'>
              <thead className='table-head'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index} className='table-row'>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id}
                        className='th text-uppercase text-center font-bold'
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className={tableBodyClass}>
                {rows.map(row => {
                  prepareRow(row)

                  if (isEmptyGate(row.original)) {
                    return (
                      <tr {...row.getRowProps()} key={row.id} className='table-row'>
                        <td className='table-data text-center p-0'>{row.original.gate}</td>
                        {/* <td className='table-data' colSpan={columns.length - 2} /> */}
                        <td className='table-data font-bold' colSpan={3}>
                          Empty
                        </td>
                        <td className='table-data text-center p-0'>
                          <div className='d-flex align-items-center justify-content-center'>
                            <button
                              className='register-btn'
                              onClick={handleRegisterButtonClick(row.original.gate as unknown as number)}
                            >
                              <span className='color-primary font-bold'>Register</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  }

                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      className='table-row position-relative'
                      onClick={handleRowItemClicked((row.original as RecordRace).id)}
                    >
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()} key={cell.column.id} className='table-data text-center p-0'>
                            <div className='table-data-container d-flex align-items-center justify-content-center w-100 h-100'>
                              {memoizedRenderDataTable(cell, cell.column.id)}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </RaceTableStyled>
  )
}

export default RaceTable
