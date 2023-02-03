import { TutorialAnimation } from "@assets/animation";
import { TutorialSvg } from "@assets/svg";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import { ButtonAdmin } from "../AdminCommunity/Adminlist/components/AdminComponent";
import LinearText from "../components/LinearText";
import { TutorialWrapper } from "./styled";
import Welcome from "../DEX/Welcome";

const Tutorial = () => {
  const { width } = useDebounceWindowResize();
  return (
    <TutorialWrapper>
      <Welcome />
    </TutorialWrapper>
  );
};

export default Tutorial;
