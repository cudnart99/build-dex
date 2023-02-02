import { strings } from '@utils/index'
import React from 'react'
import { SurgeryWrapperStyled } from './styled'

function Surgery({data,dataResult,dataDetail}) {
  return (
    <SurgeryWrapperStyled>
      {dataResult?.pttt?.map((item,index)=>(
        <div className='cdha-item'>
          <h2>{item?.tenDichVu}</h2>
          <p>{strings("modal.Surgery.txt")}</p>
          <ul>
            <li>{item?.cachThucPttt}</li>
          </ul>
          <p>{strings("modal.Surgery.txt1")}</p>
          <p>{item?.cdBanDau}</p>
          <p>{strings("modal.Surgery.txt2")}</p>
          <p>{item?.ketLuan}</p>
        </div>
      ))}
    </SurgeryWrapperStyled>
  )
}

export default Surgery