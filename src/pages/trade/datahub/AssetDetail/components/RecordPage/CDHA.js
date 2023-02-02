import TradeButton from '@components/TradeButton'
import { strings } from '@utils/index'
import React from 'react'
import { CDHAWrapperStyled } from './styled'

function CDHA({data,dataResult,dataDetail,...props}) {

  return (
   <CDHAWrapperStyled>
      <div >
      {dataResult?.cdha?.map((item,index)=>(
        <div className='cdha-item'>
          <h2>{item?.tenDichVu.trim()}</h2>
          {item?.pacsUrl&&<a href={item?.pacsUrl} target="_blank" >
            <TradeButton
              content={strings("modal.CDHA.btn1")}
              colorText={"#ffffff"}
              className='mb-2'
            />
          </a>}
          <p className='cdha-item-name'>{strings("modal.CDHA.txt")}</p>
          <ul>
            {item?.ketQua?.formatBenhAn().map((itemm,index)=>(
              <div key={index}>{itemm}</div>
            ))}
          </ul>
          <p className='cdha-item-name'>{strings("modal.CDHA.txt2")}</p>
          <p>{item?.ketLuan?.trim().formatBenhAn().map((itemm,index)=>(
              <div key={index}>{itemm}</div>
            ))}</p>
        </div>
      ))}
      </div>
   </CDHAWrapperStyled>
  )
}

export default CDHA