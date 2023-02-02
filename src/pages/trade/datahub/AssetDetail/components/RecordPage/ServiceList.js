import { Divider } from '@pages/trade/vesting/components/styled'
import React from 'react'
import { ServiceListWrapperStyled } from './styled'
import moment from "moment"
import { strings } from '@utils/index'

function ServiceList({data,dataResult,dataDetail,...props}) {
  return (
    <ServiceListWrapperStyled>
      <h2 className='service-title'>{data?.hospitalName}</h2>
      <p className='service-time'>
        <span>{strings("modal.ServiceList.txt")}:</span>
        <span>{ moment(dataResult?.ngayVaoVien)?.format("DD-MM-YYYY")}</span>
      </p>
      <p>{strings("modal.ServiceList.txt1")}</p>
      <ul className='service-list'>
        {dataDetail?.dichVu?.filter((item,index)=>item.trangThai!==310).map((item,index)=>(
          <li key={index} className="service-list-detail" >
            <span>{item?.tenDichVu}</span>
            <span>{item?.thanhTienDichVu?.formatCurrency()}đ</span>
          </li>

        ))}
      </ul>
      <Divider opacity={0.1} marginTop={10} marginBottom={20} />
      <p className='service-total'>
        <span>{strings("modal.ServiceList.txt2")}</span>
        <span>{dataDetail?.tongTien?.formatCurrency()}đ</span>
      </p>
      <p className='service-total'>
        <span>{strings("modal.ServiceList.txt3")}</span>
        <span>{dataDetail?.nbThanhToan?.formatCurrency()}đ</span>
      </p>
    </ServiceListWrapperStyled>
  )
}

export default ServiceList