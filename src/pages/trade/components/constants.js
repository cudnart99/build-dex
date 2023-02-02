import {
  FacebookShareIcon,
  LinkCopyIcon,
  TelegramShareIcon,
  TwitterShareIcon,
} from "@assets/svg";
import {
  FacebookIcon,
  MediumIcon,
  TwitterIcon,
  YoutubeIcon,
  TelegramIconNegative,
} from "@svg";
import { copyToClipBoard } from "@utils/index";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

export const IconData = {
  twitter: { icon: TwitterIcon, link: "https://twitter.com/IVIRSE_IVI_IHI" },
  medium: { icon: MediumIcon, link: "https://ivirse.medium.com" },
  youtube: {
    icon: YoutubeIcon,
    link: "https://www.youtube.com/channel/UCgjSF7eIshiwof4q8Vy2i6g/featured",
  },
  facebook: {
    icon: FacebookIcon,
    link: "https://www.facebook.com/Ivirse-104433458904449/",
  },
  telegram: {
    icon: TelegramIconNegative,
    link: "https://t.me/IVIRSEGlobalChannel",
  },
  // link: {
  //   icon: LinkCopyIcon,
  //   link: "",
  // },
};

export const ShareDataIcon = {
  twitter: {
    icon: TwitterShareIcon,
    onClick: ({ link, cid }) => {},
    Button: TwitterShareButton,
  },

  facebook: {
    icon: FacebookShareIcon,
    onClick: ({ link, cid }) => {},
    Button: FacebookShareButton,
  },
  telegram: {
    icon: TelegramShareIcon,
    onClick: ({ link, cid }) => {},
    Button: TelegramShareButton,
  },
  link: {
    icon: LinkCopyIcon,
    onClick: ({ link, cid }) => {
      copyToClipBoard(link);
    },
  },
};
