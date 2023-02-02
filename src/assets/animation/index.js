import React from "react";
import Lottie from "react-lottie";
import correctline from "./correctline";
import emptyLottie from "./emptyLottie";
import loadingcampaign from "./loadingcampaign";
import renounce from "./renounce";
import tutorial from "./tutorial";
import verify from "./verify";
import waitingRequest from "./waiting_request";
import wrongline from "./wrongline";

const LottieAnimation =
  (animationData, loop = false) =>
  () => {
    const defaultOptions = {
      loop,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="lottie">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    );
  };
export const CorrectLine = LottieAnimation(correctline);
export const WrongLine = LottieAnimation(wrongline);
export const Renounce = LottieAnimation(renounce);
export const Verify = LottieAnimation(verify);
export const EmptyLottie = LottieAnimation(emptyLottie, true);
export const LoadingCampaign = LottieAnimation(loadingcampaign, true);
export const TutorialAnimation = LottieAnimation(tutorial, true);
export const WaitingRequestAnimation = LottieAnimation(waitingRequest, true);
