import { Select } from "antd";
import { SelectGroupStyle, TradeSelectStyled } from "./styled";

export const TradeSelect = ({ icon, tag, children, ...props }) => {
  return (
    <TradeSelectStyled {...props}>
      <div className="select-prefix">
        {icon}
        <span>{tag}</span>
      </div>
      <Select {...props}>{children}</Select>
      <SelectGroupStyle />
    </TradeSelectStyled>
  );
};
