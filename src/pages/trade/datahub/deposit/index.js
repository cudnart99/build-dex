import { DownOutlined } from "@ant-design/icons";
import {
  ArrowDeposit,
  HomeDataHUb,
  SwapDeposit,
  WalletIcon,
} from "@assets/svg";
import TradeButton from "@components/TradeButton";
import RandomWaitingModal from "@components/WaitingRandom";
import { DatahubNotiTypeEnum } from "@constants/index";
import LinearText from "@pages/trade/components/LinearText";
import { blockChainConfirmationTransaction, strings } from "@utils/index";
import snackbarUtils from "@utils/snackbar-utils";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import ModalSwap from "./components/ModalSwap";
import { DepositPageWrapper } from "./styled";

export const tokens = [
  {
    Icon: require("@images/trade/datahub/ivi-token-swap.png"),
    text: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`,
    value: 1,
    description: `${process.env.REACT_APP_STABLE_TOKEN_SYMBOL} token`,
  },
  // {
  //   Icon: require("@images/trade/datahub/ihi-token-swap.png"),
  //   text: "IHI",
  //   value: 2,
  //   description: "IHI token",
  //   disabled: true,
  // },
  // {
  //   Icon: require("@images/trade/datahub/usdt-token-swap.png"),
  //   text: "USDT",
  //   value: 3,
  //   description: "TetherUS",
  //   disabled: true,
  // },
];

export const ButtonSwapToken = ({ handleOpenModalSwap, state }) => {
  const symbol = useSelector((state) => state.contracts.symbol);

  return (
    <div className="token-swap">
      <Button
        className="token-swap-btn d-flex align-items-center"
        onClick={handleOpenModalSwap}
      >
        <img
          src={
            state?.currentTokenIndex
              ? tokens[state?.currentTokenIndex]?.Icon
              : tokens[0]?.Icon
          }
          className="mr-3"
          alt=""
        />
        <span>{symbol}</span>
        <DownOutlined />
      </Button>
    </div>
  );
};

const DepositPage = () => {
  const setAmountDeposit = useDispatch()?.datahub?.setAmountDeposit;
  const amountDeposit = useSelector((state) => state?.datahub?.amountDeposit);

  const [state, _setState] = useState({
    // Method 1: deposit from wallet to datahub;
    //  2: Widthdraw from datahub to wallet
    methodToken: 1,
    currentToken: tokens[0],
    currentTokenIndex: 0,
    // modal swap
    isOpenModalSwap: false,
    // amount:input
    amount: 0,
    // modal waiting
    isOpenModalWaiting: false,
    isShowIcon: false,
  });
  const setState = (data = {}) => {
    _setState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleCloseModalWaiting = () => {
    setState({
      isOpenModalWaiting: false,
    });
  };
  const handleOpenModalWaiting = () => {
    setState({
      isOpenModalWaiting: true,
    });
  };
  const handleSwapMethodToken = (method) => {
    setState({
      methodToken: method,
    });
  };

  const handleOpenModalSwap = () => {
    setState({
      isOpenModalSwap: true,
    });
  };
  const handleCloseModalSwap = ({ tokenIdx }) => {
    tokenIdx = tokenIdx === undefined ? state.currentTokenIndex : tokenIdx;
    setState({
      isOpenModalSwap: false,
      currentTokenIndex: tokenIdx,
    });
  };

  const { address } = useSelector((state) => state.contracts);
  const buyer = useSelector((state) => state.datasharing.buyer);
  const setupConnectBuyer = useDispatch().datasharing.setupConnectBuyer;
  const buyerDeposit = useDispatch()?.datasharing?.buyerDeposit;
  const buyerWithDraw = useDispatch()?.datasharing?.buyerWithDraw;
  const buyerWithdrawable = useDispatch()?.datasharing?.buyerWithdrawable;
  const { create: createNoti } = useDispatch()["datahubNotifications"];

  const buyerWithDrawable = useSelector(
    (state) => state?.datasharing?.buyerWithDrawable
  );
  useEffect(() => {
    buyerWithdrawable();
  }, [buyer]);
  useEffect(() => {
    setupConnectBuyer();
  }, []);
  const onSuccessProc = () => {
    setState({
      amount: 0,
    });
  };
  const handleSubmit = () => {
    if (Number(amountDeposit) !== 0) {
      if (state.methodToken === 1) {
        let tokenAfterDeposit =
          (Number(amountDeposit) || 0) + (buyerWithDrawable || 0);
        if (tokenAfterDeposit >= 0.066) {
          blockChainConfirmationTransaction({
            successCallback: () => {
              buyerWithdrawable();
              onSuccessProc();
              createNoti({
                type: DatahubNotiTypeEnum.WHEN_USER_DEPOSIT_TO_SMART_CONTRACT_BALANCE_SUCCESSFULLY,
                fromUser: address,
                toUser: address,
                price: Number(amountDeposit),
              });
              setAmountDeposit({
                amount: 0,
              });
            },
            transaction: buyerDeposit,
          });
        } else {
          snackbarUtils.warning(`Deposit must have at least 0.066 ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}!`);
        }
      } else {
        blockChainConfirmationTransaction({
          successCallback: () => {
            buyerWithdrawable();
            onSuccessProc();
            createNoti({
              type: DatahubNotiTypeEnum.WHEN_USER_WITHDRAW_FROM_SMART_CONTRACT_BALANCE_TO_WALLET_SUCCESSFULLY,
              fromUser: address,
              toUser: address,
              price: Number(amountDeposit),
            });
            setAmountDeposit({
              amount: 0,
            });
          },
          transaction: buyerWithDraw,
        });
      }
    } else {
      snackbarUtils.error(
        `${strings("DepositPage.handleSubmit-error")} ${
          state?.methodToken === 1 ? strings("component.deposit") : strings("component.withdraw")
        } !`
      );
    }
  };

  return (
    <>
      <DepositPageWrapper>
        <div className="deposit-header mb-4">
          <LinearText
            title={state.methodToken === 1 ? strings("component.deposit") : strings("component.withdraw")}
            fontSize="50px"
            lineHeight="55px"
          />
        </div>
        <div className="deposit-body__wrapper d-flex justify-content-center">
          <div className="deposit-body">
            <div className="deposit-body__swap-header d-flex justify-content-center">
              {state.methodToken === 1 ? (
                <div className="wallet d-flex align-items-center">
                  <WalletIcon />
                  <span>{strings("DepositPage.wallet")}</span>
                </div>
              ) : (
                <div className="datahub d-flex align-items-center">
                  <HomeDataHUb />
                  <span>{strings("DepositPage.datahub")}</span>
                </div>
              )}
              <div className="hover-pointer ml-2 mr-2">
                <div
                  className="testtt"
                  onClick={() => {
                    if (state.methodToken === 1) handleSwapMethodToken(2);
                    else handleSwapMethodToken(1);
                  }}
                  onMouseEnter={() => setState({ isShowIcon: true })}
                  onMouseLeave={() => setState({ isShowIcon: false })}
                >
                  {!state.isShowIcon && <ArrowDeposit />}
                  {state.isShowIcon && <SwapDeposit />}
                </div>
              </div>
              {state.methodToken === 1 ? (
                <div className="datahub d-flex align-items-center">
                  <HomeDataHUb />
                  <span>{strings("DepositPage.datahub")}</span>
                </div>
              ) : (
                <div className="wallet d-flex align-items-center">
                  <WalletIcon />
                  <span>{strings("DepositPage.wallet")}</span>
                </div>
              )}
            </div>
            <p className="deposit-swap-text text-center">
              {state.methodToken === 1
                ? strings("DepositPage.txt")
                : strings("DepositPage.txt1")}
            </p>
            <div className="deposit-body__swap-body d-flex justify-content-space-between mb-4">
              <div>
                <ButtonSwapToken
                  handleOpenModalSwap={handleOpenModalSwap}
                  state={state}
                />
                <div className="token-amount mt-2">
                  <CurrencyInput
                    className="currency-input"
                    placeholder={strings("DepositPage.enter-amount")}
                    style={{ width: "100%" }}
                    decimalSeparator={"."}
                    groupSeparator={","}
                    decimalsLimit={8}
                    onValueChange={(value) => {
                      setAmountDeposit({
                        amount: value,
                      });
                    }}
                    value={amountDeposit}
                  />
                </div>
              </div>
              <p className="token-balance">
                {strings("component.balance")}:{" "}
                {typeof buyerWithDrawable === "number"
                  ? Math.round(buyerWithDrawable * 10000) / 10000
                  : ""}
              </p>
            </div>
            <div className="estimate-gas-fee d-flex justify-content-space-between"></div>
            <TradeButton
              content={state.methodToken === 1 ? strings("component.deposit") : strings("component.withdraw")}
              type="gradient"
              className="w-full"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </DepositPageWrapper>
      <ModalSwap
        open={state.isOpenModalSwap}
        onOk={() => {}}
        onCancel={handleCloseModalSwap}
        tokenLists={tokens}
        currentToken={tokens[state.currentTokenIndex]}
      />
      <RandomWaitingModal
        open={state.isOpenModalWaiting}
        // onOk={() => {}}
        // onCancel={handleCloseModalWaiting}
        title={strings("DepositPage.txt2")}
        // content={"Metamask is processing..."}
      />
    </>
  );
};

export default DepositPage;
