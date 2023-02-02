import { DeleteOutlined } from "@ant-design/icons";
import adminProvider from "@data-access/admin-provider";
import notificationProvider from "@data-access/notification-provider";
import useCustomState from "@hook/useCustomState";
import ModalHeader from "@pages/trade/components/ModalHeader";
import { LinearButton } from "@pages/trade/components/styled";
import snackbarUtils from "@utils/snackbar-utils";
import { Button, Form, Input } from "antd";
import { ethers } from "ethers";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";
import { NewModal as Modal } from "./styled";

const CreateAdminModal = (props, ref) => {
  const [state, setState] = useCustomState({});
  const callbackRef = useRef();

  const name = useSelector((state) => state?.auth?.auth?.data?.name);
  const {
    address,
    currentContractProperties: { name: network },
  } = useSelector((state) => state.contracts);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: ({ callback = () => {} }) => {
      callbackRef.current = callback;
      setState({ visible: true });
    },
  }));
  const onCancel = () => {
    callbackRef.current();

    setState({ visible: false });
  };

  return (
    <Modal
      title={<ModalHeader title={"Create New Admin"} callback={onCancel} />}
      open={state.visible}
      onCancel={onCancel}
      closable={true}
      footer={
        <React.Fragment>
          <Button
            className="delete__btn"
            onClick={() => {
              form.resetFields();
            }}
          >
            <DeleteOutlined />
            Delete
          </Button>
          <LinearButton
            className="submit__btn"
            onClick={() => {
              form.validateFields().then((body) => {
                body.status = 10;
                adminProvider
                  .create(body)
                  .then((res) => {
                    if (res.code == 0) {
                      notificationProvider.create({
                        category: "Account",
                        contentTitle: "Action needed",
                        content: `${name} created account ${body?.name}. Action required.`,
                        network,
                      });
                      snackbarUtils.success(
                        "You have successfully proposed a new admin!"
                      );
                      onCancel();
                    } else if (res.code == 1001) {
                      snackbarUtils.error(
                        "Wallet address already exists. Please use another wallet address!"
                      );
                    } else {
                      snackbarUtils.error(res.message);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    snackbarUtils.error("Create fail!");
                  });
              });
            }}
          >
            Request create admin
          </LinearButton>
        </React.Fragment>
      }
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        labelAlign="left"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input admin's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wallet Address"
          name="walletAddress"
          rules={[
            {
              required: true,
              validator: (rule, value, callback) => {
                let isValid = ethers.utils.isAddress(value);
                if (isValid) {
                  callback();
                } else if (!value) {
                  callback("Please enter wallet address!");
                } else {
                  callback("Address invalid!");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={address}
          label="Creator"
          name="creator"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          initialValue={network}
          label="Network"
          name="network"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateAdminModal);
